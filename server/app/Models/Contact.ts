import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Designation from './Designation'
import Company from './Company'
import Industry from './Industry'
import Country from './Country'
import User from './User'

export default class Contact extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
 
  @column()
  public designationId: number
 
  @column()
  public companyId: number
 
  @column()
  public industryId: number

  @column()
  public email: string
 
  @column()
  public phone_number: string

  @column()
  public countryId: number
 
  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Designation)
  public designation: BelongsTo<typeof Designation>

  @belongsTo(() => Company)
  public company: BelongsTo<typeof Company>

  @belongsTo(() => Industry)
  public industry: BelongsTo<typeof Industry>

  @belongsTo(() => Country)
  public country: BelongsTo<typeof Country>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>


  public static loadAll = async(contact: Contact) => {
    return await contact.load((loader) => {
      loader.load('designation').load('company').load('industry').load('country')
    })
  }

}
