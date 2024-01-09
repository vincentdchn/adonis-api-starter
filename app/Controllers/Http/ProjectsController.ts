import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import CreateProjectValidator from 'App/Validators/Project/CreateProjectValidator'
import UpdateProjectValidator from 'App/Validators/Project/UpdateProjectValidator'

export default class ProjectsController {
  /**
   * List all projects
   */
  public async list({ bouncer, response }: HttpContextContract) {
    await bouncer.with('ProjectPolicy').authorize('list')
    const projects = await Project.query().preload('user', (u) => u.select('firstname', 'lastname'))

    return response.status(200).json({ success: true, data: projects })
  }

  /**
   * List all user projects
   */
  public async index({ auth, response }: HttpContextContract) {
    const user = auth.user
    if (!user) return response.status(403).json({ success: false, message: 'Unauthorized' })
    const projects = await Project.query().where('user_id', user.id)

    return response.status(200).json({ success: true, data: projects })
  }

  /**
   * Create a new project
   */
  public async store({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    const payload = await request.validate(CreateProjectValidator)
    const project = await Project.create({ ...payload, userId: user?.id })

    return response.status(201).json({ success: true, message: 'Project created', data: project })
  }

  /**
   * Show a project
   */
  public async show({ bouncer, request, response }: HttpContextContract) {
    const project = await Project.findOrFail(request.params().id)
    await bouncer.with('ProjectPolicy').authorize('show', project)

    return response.status(200).json({ success: true, data: project })
  }

  /**
   * Update a project
   */
  public async update({ bouncer, request, response }: HttpContextContract) {
    const project = await Project.findOrFail(request.params().id)
    await bouncer.with('ProjectPolicy').authorize('update', project)
    const payload = await request.validate(UpdateProjectValidator)
    project.merge(payload).save()

    return response.status(200).json({ success: true, message: 'Project updated', data: project })
  }

  /**
   * Delete a project
   */
  public async destroy({ bouncer, request, response }: HttpContextContract) {
    const project = await Project.findOrFail(request.params().id)
    await bouncer.with('ProjectPolicy').authorize('destroy', project)
    await project.delete()

    return response.status(204).json({ success: true, message: 'Project deleted' })
  }
}
