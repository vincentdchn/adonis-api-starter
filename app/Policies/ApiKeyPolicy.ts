import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import ApiKey from 'App/Models/ApiKey'
import Project from 'App/Models/Project'

export default class ApiKeyPolicy extends BasePolicy {
  public async list(user: User) {
    return user.isAdmin
  }
  public async store(user: User, project: Project) {
    return user.isAdmin || user.id === project.userId
  }
  public async show(user: User, apiKey: ApiKey) {
    return user.isAdmin || user.id === apiKey.userId
  }
  public async update(user: User, apiKey: ApiKey) {
    return user.isAdmin || user.id === apiKey.userId
  }
  public async destroy(user: User, apiKey: ApiKey) {
    return user.isAdmin || user.id === apiKey.userId
  }
}
