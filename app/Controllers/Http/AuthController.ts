import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginUserValidator from 'App/Validators/Auth/LoginUserValidator'
import RegisterUserValidator from 'App/Validators/Auth/RegisterUserValidator'

export default class AuthController {
  public async register({ response, request }: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidator)
    await User.create(payload)

    return response.status(200).json({ success: true, message: 'Registration successful' })
  }

  public async login({ response, request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginUserValidator)
    const { token } = await auth.use('api').attempt(email, password)

    return response
      .status(200)
      .json({ success: true, message: 'Login successful', data: { token } })
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.status(200).json({ success: true, message: 'Logout successful' })
  }
}
