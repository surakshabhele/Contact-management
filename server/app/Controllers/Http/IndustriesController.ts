import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Industry from 'App/Models/Industry'
import CreateIndustryValidator from 'App/Validators/ContactManagementValidators/CreateIndustryValidator'
import UpdateIndustryValidator from 'App/Validators/ContactManagementValidators/UpdateIndustryValidator'

export default class IndustriesController {
  public async index({}: HttpContextContract) {
    const industries = await Industry.query().orderBy('name', 'asc')
    return industries
  }

  public async show({ request }: HttpContextContract) {
    const industry = await Industry.findByOrFail('id', request.param('id'))
    return { data: industry }
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateIndustryValidator)
    const industry = await Industry.create(payload)
    return { data: industry }
  }

  public async update({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateIndustryValidator)
    const industry = await Industry.findByOrFail('id', request.param('id'))
    await industry.merge(payload).save()
    return { data: industry }
  }

  public async destroy({ request }: HttpContextContract) {
    const industry = await Industry.findOrFail(request.param('id'))
    await industry.delete()

    return { data: null }
  }
}
