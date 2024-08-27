import { Kysely } from 'kysely';
import type { OrderItemTable } from '../src/lib/db/models/order.model';
export async function up(db: Kysely<OrderItemTable>): Promise<void> {
	db.schema
		.createTable('order_item')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('order_id', 'integer', (col) => col.references('order.id').onDelete('cascade'))
		.addColumn('product_id', 'integer', (col) => col.references('product.id').onDelete('restrict'))
		.addColumn('quantity', 'integer', (col) => col.defaultTo(1))
		.execute();
}

export async function down(db: Kysely<OrderItemTable>): Promise<void> {
	await db.schema.dropTable('order_item').execute();
}
