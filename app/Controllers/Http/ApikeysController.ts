import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import generateApiKey from 'generate-api-key'
import crypto from 'crypto'
import ApiKey from 'App/Models/ApiKey'
import Project from 'App/Models/Project'
import GenerateApiKeyValidator from 'App/Validators/Key/GenerateApiKeyValidator'
import UpdateApiKeyValidator from 'App/Validators/Key/UpdateApiKeyValidator'

export default class ApiKeysController {
  /**
   * List all API keys
   */
  public async list({ bouncer, response }: HttpContextContract) {
    await bouncer.with('ApiKeyPolicy').authorize('list')

    const keys = await ApiKey.query()
      .preload('user', (u) => u.select('firstname', 'lastname'))
      .preload('project', (p) => p.select('name', 'description'))

    return response.status(200).json({ success: true, data: keys })
  }

  /**
   * List all user API keys
   */
  public async index({ auth, response }: HttpContextContract) {
    const user = auth.user
    if (!user) return response.status(403).json({ success: false, message: 'Unauthorized' })
    const keys = await ApiKey.query().where('user_id', user.id)

    return response.status(200).json({ success: true, data: keys })
  }

  /**
   * Create a new API key
   */
  public async store({ auth, request, bouncer, response }: HttpContextContract) {
    const user = auth.user
    const payload = await request.validate(GenerateApiKeyValidator)
    const project = await Project.findOrFail(payload.projectId)

    await bouncer.with('ApiKeyPolicy').authorize('store', project)

    const { key, hashedKey } = await this.generateUniqueApiKey()
    await ApiKey.create({ ...payload, userId: user?.id, key: hashedKey })

    return response.status(201).json({ success: true, message: 'API key created', data: { key } })
  }

  /**
   * Show an API key
   */
  public async show({ bouncer, request, response }: HttpContextContract) {
    const key = await ApiKey.findOrFail(request.params().id)
    await bouncer.with('ApiKeyPolicy').authorize('show', key)

    return response.status(200).json({ success: true, data: key })
  }

  /**
   * Update an API key
   */
  public async update({ bouncer, request, response }: HttpContextContract) {
    const key = await ApiKey.findOrFail(request.params().id)
    await bouncer.with('ApiKeyPolicy').authorize('update', key)
    const payload = await request.validate(UpdateApiKeyValidator)

    key.merge(payload).save()

    return response.status(200).json({ success: true, message: 'API key updated', data: key })
  }

  /**
   * Delete an API key
   */
  public async destroy({ bouncer, request, response }: HttpContextContract) {
    const key = await ApiKey.findOrFail(request.params().id)
    await bouncer.with('ApiKeyPolicy').authorize('destroy', key)
    await key.delete()

    return response.status(204).json({ success: true, message: 'API key deleted' })
  }

  /**
   * Generate a unique API key
   */
  private async generateUniqueApiKey(): Promise<{ key: string; hashedKey: string }> {
    let uniqueKeyFound = false
    let key = ''
    let hashedKey = ''

    while (!uniqueKeyFound) {
      key = generateApiKey({ method: 'base62', prefix: 'API' }) as string

      hashedKey = crypto.createHash('sha256').update(key).digest('hex')

      const keyExists = !!(await ApiKey.findBy('key', hashedKey))

      if (!keyExists) {
        uniqueKeyFound = true
      }
    }

    return { key, hashedKey }
  }
}
