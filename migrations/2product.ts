import { Kysely } from 'kysely';
import type { ProductTable } from '../src/lib/db/models/product.model';
export async function up(db: Kysely<ProductTable>): Promise<void> {
  await db.schema
    .createTable('product')
    .addColumn('id', 'serial', (col) => col.primaryKey())

    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('rating', 'float4', (col) => col.defaultTo(0.0))
    .addColumn('category_id', 'integer', (col) =>
      col.references('category.id').onDelete('set null').notNull()
    )
    .addColumn('cover_image', 'varchar(255)', (col) =>
      col.defaultTo('https://picsum.photos/id/237/200/300')
    )
    .addColumn('discount', 'integer', (col) => col.defaultTo(0))

    .addColumn('quantity', 'integer', (col) => col.defaultTo(0))
    .addColumn('in_stock', 'boolean', (col) => col.defaultTo(false))
    .addColumn('is_new', 'boolean', (col) => col.defaultTo(false))
    .addColumn('is_feature', 'boolean', (col) => col.defaultTo(false))
    .addColumn('is_best_selling', 'boolean', (col) => col.defaultTo(false))
    .addColumn('properties', 'json')

    .execute();
}

export async function down(db: Kysely<ProductTable>): Promise<void> {
  await db.schema.dropTable('product').execute();
}
