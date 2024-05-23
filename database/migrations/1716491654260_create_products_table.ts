import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid').notNullable()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.float('price').notNullable()
      table.float('discountPercentage')
      table.float('rating')
      table.integer('stock').notNullable()
      table.integer('category_id').notNullable()
      table.foreign('category_id').references('categories.id').onDelete('CASCADE')
      table.string('thumbnail').notNullable()
      table.boolean('is_active').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
