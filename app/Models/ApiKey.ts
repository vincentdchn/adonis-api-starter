import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, BelongsTo, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Project from 'App/Models/Project'

export default class ApiKey extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public userId: number

  @column({ serializeAs: null })
  public projectId: number

  @column()
  public name: string

  @column({ serializeAs: null })
  public key: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>

  @beforeSave()
  public static async hashKey(apiKey: ApiKey) {
    if (apiKey.$dirty.key) {
      apiKey.key = await Hash.make(apiKey.key)
    }
  }
}
