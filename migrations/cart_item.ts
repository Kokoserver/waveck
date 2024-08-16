import { Kysely } from 'kysely';
import type { CartItemTable } from '../src/lib/db/models/cart.model';
export async function up(db: Kysely<CartItemTable>): Promise<void> {
	await db.schema
		.createTable('cart_item')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('cart_id', 'integer', (col) =>
			col.references('cart.id').onDelete('cascade').notNull()
		)
		.addColumn('product_id', 'integer', (col) =>
			col.references('product.id').notNull().onDelete('cascade')
		)
		.addColumn('quantity', 'integer', (col) => col.defaultTo(0))

		.execute();
}

export async function down(db: Kysely<CartItemTable>): Promise<void> {
	await db.schema.dropTable('cart_item').execute();
}
