import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/User/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'

export default class UsersController {
  /**
   * List all users
   */
  public async index({ bouncer, response }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('index')
    const users = await User.all()

    return response.status(200).json({ success: true, data: users })
  }

  /**
   * Create a new user
   */
  public async store({ bouncer, request, response }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('store')
    const payload = await request.validate(CreateUserValidator)
    const user = await User.create(payload)

    return response.status(201).json({ success: true, message: 'User created', data: user })
  }

  /**
   * Show a user
   */
  public async show({ bouncer, request, response }: HttpContextContract) {
    const user = await User.findOrFail(request.params().id)
    await bouncer.with('UserPolicy').authorize('show', user)
    await user.load('projects', (p) => p.preload('keys'))

    return response.status(200).json({ success: true, data: user })
  }

  /**
   * Update a user
   */
  public async update({ bouncer, request, response }: HttpContextContract) {
    const user = await User.findOrFail(request.params().id)
    await bouncer.with('UserPolicy').authorize('update', user)
    const payload = await request.validate(UpdateUserValidator)
    user.merge(payload).save()

    return response.status(200).json({ success: true, message: 'User updated', data: user })
  }

  /**
   * Delete a user
   */
  public async destroy({ bouncer, request, response }: HttpContextContract) {
    const user = await User.findOrFail(request.params().id)
    await bouncer.with('UserPolicy').authorize('destroy', user)
    await user.delete()

    return response.status(204).json({ success: true, message: 'User deleted' })
  }
}
