import { Kysely } from 'kysely';
import type { OrderTable } from '../src/lib/db/models/order.model';
export async function up(db: Kysely<OrderTable>): Promise<void> {
	await db.schema
		.createTable('order')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('user_id', 'integer', (col) =>
			col.references('user.id').onDelete('cascade').notNull()
		)
		.addColumn('total_price', 'decimal', (col) => col.defaultTo(0).notNull())
		.addColumn('status', 'varchar(255)', (col) => col.defaultTo('pending'))
		.addColumn('metadata', 'json')

		.execute();
}

export async function down(db: Kysely<OrderTable>): Promise<void> {
	await db.schema.dropTable('order').execute();
}
