import { Kysely } from 'kysely';
import type { UserTable } from '../src/lib/db/models/user.model';
export async function up(db: Kysely<UserTable>): Promise<void> {
	await db.schema
		.createTable('user')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('first_name', 'varchar(150)', (col) => col.notNull())
		.addColumn('last_name', 'varchar(150)', (col) => col.notNull())
		.addColumn('user_type', 'varchar(150)', (col) => col.defaultTo('user'))
		.addColumn('email', 'varchar(255)', (col) => col.unique().notNull())
		.addColumn('is_active', 'boolean', (col) => col.defaultTo(false))
		.addColumn('password', 'text', (col) => col.notNull())
		.addColumn('metadata', 'json')
		.execute();
}

export async function down(db: Kysely<UserTable>): Promise<void> {
	await db.schema.dropTable('user').execute();
}
