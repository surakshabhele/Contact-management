import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from 'App/Models/Contact'
import ContactsResponse from 'App/Responses/ContactsResponse'
import CreateContactValidator from 'App/Validators/ContactManagementValidators/CreateContactValidator'
import UpdateContactValidator from 'App/Validators/ContactManagementValidators/UpdateContactValidator'
import { parse } from 'csv-parse'
import fs from 'fs'

export default class ContactsController {
  public async index({ request, bouncer, auth }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page')
    const userId = request.param('user_id')

    console.log('userId=>', userId)
    console.log('userId type=>', typeof userId)
    console.log('userId via auth=>', auth.user?.id)
    console.log('userId via auth type=>', typeof auth.user?.id)
    await bouncer.with('ContactPolicy').authorize('viewAll', userId)

    // const uId = auth.user?.id

    // if (uId != undefined) {
    const contacts = await Contact.query()
      .where('user_id', userId)
      .preload('designation')
      .preload('company')
      .preload('industry')
      .preload('country')
      .orderBy('id', 'asc')
      .paginate(page, perPage)

    return contacts
    // }
  }

  public async store({ request, bouncer }: HttpContextContract) {
    const payload = await request.validate(CreateContactValidator)
    const contact = await Contact.create(payload)
    await bouncer.with('ContactPolicy').authorize('store', contact)

    await contact.save()

    await Contact.loadAll(contact)

    return { data: contact }
  }

  public async show({ request, auth, bouncer }: HttpContextContract) {
    const uId = auth.user?.id

    if (uId != undefined) {
      const contact = await Contact.query()
        .where('id', request.param('id'))
        .preload('designation')
        .preload('company')
        .preload('industry')
        .preload('country')
        .firstOrFail()

      await bouncer.with('ContactPolicy').authorize('view', contact)

      const data = ContactsResponse.single(contact)
      return { data }
    }
  }

  public async update({ request, bouncer }: HttpContextContract) {
    const payload = await request.validate(UpdateContactValidator)
    const contact = await Contact.findByOrFail('id', request.param('id'))

    await contact.merge(payload).save()

    await bouncer.with('ContactPolicy').authorize('store', contact)

    await Contact.loadAll(contact)

    const data = ContactsResponse.single(contact)
    return { data }
  }

  public async destroy({ request, bouncer }: HttpContextContract) {
    const contact = await Contact.findOrFail(request.param('id'))
    const userId = parseInt(request.param('user_id'))

    await bouncer.with('ContactPolicy').authorize('destroy', userId)
    await contact.delete()

    return { data: null }
  }

  public async handleCsvImport({ request }: HttpContextContract) {
    const file = request.file('file')

    if (file?.tmpPath) {
      const data = await this.getDataFromCsvFile(file.tmpPath)
      return { data }
    }

    return { data: [] }
  }

  private async getDataFromCsvFile(path: string) {
    const records: any[] = []
    const buffer = fs.readFileSync(path)

    // console.log('content', )

    const parser = parse(buffer)

    for await (const x of parser) {
      records.push(x)
    }

    // parser.on('readable', function () {
    //   let record
    //   while ((record = parser.read()) !== null) {
    //     records.push(record)
    //   }
    // })

    // const handleParseCallback = new Promise<any[]>((resolve, reject) => {
    //   parser.on('end', function () {

    //     console.log("records", records)
    //     resolve(records)
    //   })

    //   parser.on('error', function (err) {
    //     reject(err)
    //   })
    // })

    // return handleParseCallback

    return records
  }

  public async search({ request, auth }: HttpContextContract) {
    const query = request.param('query')
    if (auth.user?.id) {
      const contacts = await Contact.query()
        .where('name', 'LIKE', '%' + query + '%')
        .andWhere('userId', auth.user?.id)
        .orderBy('name', 'asc')
        .preload('designation')
        .preload('company')
        .preload('industry')
        .preload('country')

        const data = ContactsResponse.collection(contacts)
      return {data :data}
    }

    return {data: []}
  }
}
