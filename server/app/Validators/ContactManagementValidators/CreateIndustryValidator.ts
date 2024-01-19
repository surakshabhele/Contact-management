import { schema, CustomMessages, validator, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateIndustryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.unique({ table: 'industries', column: 'name' }),
    ]),
  })

  public messages: CustomMessages = {}
}
