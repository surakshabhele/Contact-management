import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'contacts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name')
      table.integer('designation_id').notNullable().unsigned().references('designations.id').onDelete('CASCADE')
      table.integer('company_id').notNullable().unsigned().references('companies.id').onDelete('CASCADE')
      table.integer('industry_id').notNullable().unsigned().references('industries.id').onDelete('CASCADE')
      table.string('email')
      table.string('phone_number')
      table.integer('country_id').notNullable().unsigned().references('countries.id').onDelete('CASCADE')
      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
