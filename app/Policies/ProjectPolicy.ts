import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Project from 'App/Models/Project'

export default class ProjectPolicy extends BasePolicy {
  public async list(user: User) {
    return user.isAdmin
  }
  public async show(user: User, project: Project) {
    return user.isAdmin || user.id === project.userId
  }
  public async update(user: User, project: Project) {
    return user.isAdmin || user.id === project.userId
  }
  public async destroy(user: User, project: Project) {
    return user.isAdmin || user.id === project.userId
  }
}
