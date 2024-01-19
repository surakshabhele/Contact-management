import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Designation from 'App/Models/Designation'
import CreateDesignationValidator from 'App/Validators/ContactManagementValidators/CreateDesignationValidator'
import UpdateDesignationValidator from 'App/Validators/ContactManagementValidators/UpdateDesignationValidator'

export default class DesignationsController {
  public async index({}: HttpContextContract) {
   
    const designations = await Designation.query().orderBy('name','asc')

    return designations
  }

  public async show({request}: HttpContextContract) {
    const designation = await Designation.findByOrFail('id', request.param('id'))
    return { data: designation }
  }

  public async store({request}: HttpContextContract) {
    const payload = await request.validate(CreateDesignationValidator)
    const designation = await Designation.create(payload)
    return { data: designation }
  }


  public async update({request}: HttpContextContract) {
    const payload = await request.validate(UpdateDesignationValidator)
    const designation = await Designation.findByOrFail('id', request.param('id'))
    await designation.merge(payload).save()
    return { data: designation }
  }

  public async destroy({request}: HttpContextContract) {
    const designation = await Designation.findOrFail(request.param('id'))
    await designation.delete()

    return { data: null }
  }

}
