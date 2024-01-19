import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Contact from './Contact'

export default class Industry extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=> Contact)
  public contacts: HasMany<typeof Contact>
}
