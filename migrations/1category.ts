import { Kysely } from 'kysely';
import type { Category } from '../src/lib/db/models/category.model';
export async function up(db: Kysely<Category>): Promise<void> {
	await db.schema
		.createTable('category')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('name', 'varchar(150)', (col) => col.notNull())

		.execute();
}

export async function down(db: Kysely<Category>): Promise<void> {
	await db.schema.dropTable('category').execute();
}
