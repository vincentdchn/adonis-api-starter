import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async index(user: User) {
    return user.isAdmin
  }
  public async store(user: User) {
    return user.isAdmin
  }
  public async show(user: User, u: User) {
    return user.isAdmin || user.id === u.id
  }
  public async update(user: User, u: User) {
    return user.isAdmin || user.id === u.id
  }
  public async destroy(user: User, u: User) {
    return user.isAdmin || user.id === u.id
  }
}
