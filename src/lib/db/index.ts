import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from '$lib/db/models';

const dialect = new PostgresDialect({
	pool: new pg.Pool({
		host: 'localhost',
		database: 'waveck',
		user: 'postgres',
		password: 'olaoluwa',
		port: 5432
	})
});

export const db = new Kysely<Database>({
	dialect
});
