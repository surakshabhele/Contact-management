import { schema, CustomMessages, validator, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateContactValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = validator.reporters.api
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3)]),
    designation_id: schema.number(),
    company_id: schema.number(),
    industry_id: schema.number(),
    email: schema.string({ trim: true }, [rules.email()]),
    phone_number: schema.string({ trim: true }),
    country_id: schema.number(),
    user_id: schema.number(),
  })
  public messages: CustomMessages = {}
}
