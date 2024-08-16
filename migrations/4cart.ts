import { Kysely } from 'kysely';
import type { CartTable } from '../src/lib/db/models/cart.model';
export async function up(db: Kysely<CartTable>): Promise<void> {
	await db.schema
		.createTable('cart')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('user_id', 'integer', (col) =>
			col.references('user.id').onDelete('cascade').notNull()
		)
		.addColumn('total_price', 'decimal', (col) => col.defaultTo(0).notNull())

		.execute();
}

export async function down(db: Kysely<CartTable>): Promise<void> {
	await db.schema.dropTable('cart').execute();
}
