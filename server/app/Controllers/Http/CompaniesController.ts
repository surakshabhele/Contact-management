import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Company from 'App/Models/Company'
import CreateCompanyValidator from 'App/Validators/ContactManagementValidators/CreateCompanyValidator'
import UpdateCompanyValidator from 'App/Validators/ContactManagementValidators/UpdateCompanyValidator'

export default class CompaniesController {
  public async index({}: HttpContextContract) {
    const companies = await Company.query().orderBy('name','asc')
    return companies
  }

  public async show({ request }: HttpContextContract) {
    const company = await Company.findByOrFail('id', request.param('id'))
    return { data: company }
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateCompanyValidator)
    const company = await Company.create(payload)
    return { data: company }
  }

  public async update({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateCompanyValidator)
    const company = await Company.findByOrFail('id', request.param('id'))
    await company.merge(payload).save()
    return { data: company }
  }

  public async destroy({ request }: HttpContextContract) {
    const company = await Company.findOrFail(request.param('id'))
    await company.delete()

    return { data: null }
  }

 
}
