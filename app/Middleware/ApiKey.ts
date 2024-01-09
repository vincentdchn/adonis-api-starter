import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import crypto from 'crypto'
import ApiKey from 'App/Models/ApiKey'

export default class ApiKeyMiddleware {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const apiKeyHeader = request.header('API-Key')

    if (!apiKeyHeader) {
      return response.status(401).json({ message: 'API key missing' })
    }

    const hashedKey = crypto.createHash('sha256').update(apiKeyHeader).digest('hex')
    const apiKeyRecord = await ApiKey.findBy('key', hashedKey)

    if (!apiKeyRecord) {
      return response.status(401).json({ message: 'Invalid API key' })
    }

    await next()
  }
}
