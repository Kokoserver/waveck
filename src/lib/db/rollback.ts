import * as path from 'path';
import pg from 'pg';
import { promises as fs } from 'fs';
import { Kysely, Migrator, PostgresDialect, FileMigrationProvider } from 'kysely';
import type { Database } from './models';

async function migrateToLatest() {
	const db = new Kysely<Database>({
		dialect: new PostgresDialect({
			pool: new pg.Pool({
				host: 'localhost',
				database: 'waveck',
				user: 'postgres',
				password: 'olaoluwa',
				port: 5432
			})
		})
	});

	const migrator = new Migrator({
		db,
		provider: new FileMigrationProvider({
			fs,
			path,
			migrationFolder: path.join(process.cwd(), './migrations')
		})
	});

	const { error, results } = await migrator.migrateDown();

	results?.forEach((it) => {
		if (it.status === 'Success') {
			console.log(`migration "${it.migrationName}" was executed successfully`);
		} else if (it.status === 'Error') {
			console.error(`failed to execute migration "${it.migrationName}"`);
		}
	});

	if (error) {
		console.error('failed to migrate');
		console.error(error);
		process.exit(1);
	}

	await db.destroy();
}

migrateToLatest();
