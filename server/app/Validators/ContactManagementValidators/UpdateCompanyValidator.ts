import { schema, CustomMessages, validator, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCompanyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.unique({ table: 'companies', column: 'name' }),
    ]),
  })
  public messages: CustomMessages = {}
}
