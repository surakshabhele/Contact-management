import { schema, CustomMessages, validator, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateContactValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api
  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.minLength(3)]),
    designation_id: schema.number.optional(),
    company_id: schema.number.optional(),
    industry_id: schema.number.optional(),
    email: schema.string.optional({ trim: true }, [rules.email()]),
    phone_number: schema.string.optional({ trim: true }),
    country_id: schema.number.optional(),
    user_id: schema.number.optional(),
  })

  public messages: CustomMessages = {}
}
