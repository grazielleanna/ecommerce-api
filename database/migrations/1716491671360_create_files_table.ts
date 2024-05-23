import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'files'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uuid').notNullable()
      table.string('file').notNullable()
      table.string('filename').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}