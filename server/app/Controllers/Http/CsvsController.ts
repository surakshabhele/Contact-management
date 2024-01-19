import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import _ from 'lodash'
import fs from 'fs'
import Json2csv from 'json2csv'

import Contact from 'App/Models/Contact'
import ImportCsvWorkflow from 'App/Workflow/ImportCsvWorkflow'
import Application from '@ioc:Adonis/Core/Application'

export default class CsvsController {
  public async index({ request, response }: HttpContextContract) {
    const Json2csvParser = Json2csv.Parser

    const inputIds = request.input('inputIds')
    const contacts = await Contact.query().whereIn('id', inputIds)

    const json2csvParser = new Json2csvParser()
    const csv = json2csvParser.parse(contacts.map(x => x.toJSON()))
    fs.writeFile('tmp/uploads/mysql_fs.csv', csv, function (error) {
      if (error) throw error
      console.log('Write to mysql_fs.csv successfully!')
    })

    const filePath = Application.tmpPath('uploads/mysql_fs.csv')

    response.download(filePath, true, (error) => {
      if (error.code === 'ENOENT') {
        return ['File does not exists', 404]
      }

      return ['Cannot download file', 400]
    })
  }

  public async store({ request, auth }: HttpContextContract) {
    const file = request.file('file')
    const uid = auth.user?.id
    if (file?.tmpPath && uid) {
      const i = new ImportCsvWorkflow(uid, file.tmpPath)

      const res = await i.run(uid, file.tmpPath)

      const existingContacts = await Contact.query().where('userId', uid)

      const duplicates = _.intersectionBy(existingContacts, res, 'email')

      const difference = _.differenceBy(res, duplicates, 'email')

      if (difference.length != 0) {
        await Contact.createMany(difference)

        return {
          data: 'Data imported and merged duplicate contacts',
        }
      } else {
        return {
          data: 'Contacts are already upto date.',
        }
      }
    }

    return { data: [] }
  }
}
