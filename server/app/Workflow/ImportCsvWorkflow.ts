import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from 'App/Models/Contact'
import getDataFromCsvFile from 'App/Workflow/ImportCsvWorkflow'
import { parse } from 'csv-parse'
import fs from 'fs'

export default class ImportCsvWorkflow {

  
    constructor(auth:number| undefined, path:string) {
        console.log('@ioc:App/Workflow/ImportCsvWorkflow constr-> user:'+auth + "path: "+path)
    }
  
    public async run(auth:number| undefined, path:string) {
      console.log('@ioc:App/Workflow/ImportCsvWorkflow-> user:'+auth + "path: "+path)

      const data = await this.getDataFromCsvFile(path)

        const obj = data.map((d) => {
        return {
          name: d[1],
          designation_id: d[2],
          company_id: d[3],
          industry_id: d[4],
          email: d[5],
          phone_number: d[6],
          country_id: d[7],
          user_id: auth
        }
      })
      
      return obj;

    }

    private async  getDataFromCsvFile(path: string) {
        const records: any[] = []
        const buffer = fs.readFileSync(path)
    
        // console.log('content', )
    
        const parser = parse(buffer)
    
        for await (const x of parser) {
          records.push(x)
        }
        return records
    
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
    
        
      }
  }
