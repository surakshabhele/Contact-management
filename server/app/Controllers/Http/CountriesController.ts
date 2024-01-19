import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Country from 'App/Models/Country'
import CreateCountryValidator from 'App/Validators/ContactManagementValidators/CreateCountryValidator'
import UpdateCountryValidator from 'App/Validators/ContactManagementValidators/UpdateCountryValidator'

export default class CountriesController {
  public async index({}: HttpContextContract) {
    const countries = await Country.query().orderBy('name','asc')
    return countries
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateCountryValidator)
    const country = await Country.create(payload)
    return { data: country }
  }

  public async show({ request }: HttpContextContract) {
    const country = await Country.findByOrFail('id', request.param('id'))
    return { data: country }
  }

  public async update({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateCountryValidator)
    const country = await Country.findByOrFail('id', request.param('id'))
    await country.merge(payload).save()
    return { data: country }
  }

  public async destroy({ request }: HttpContextContract) {
    const country = await Country.findOrFail(request.param('id'))
    await country.delete()

    return { data: null }
  }
}
