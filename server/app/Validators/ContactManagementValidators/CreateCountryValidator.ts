import { schema, CustomMessages, rules, validator } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCountryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.unique({ table: 'countries', column: 'name' }),
    ]),
    timezone: schema.string({ trim: true }),
    code: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(3),
      rules.unique({ table: 'countries', column: 'code' }),
    ]),
  })

  public messages: CustomMessages = {}
  // public reporter = validator.reporters.vanilla
}
