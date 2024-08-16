import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface CategoryTable {
	id: Generated<number>;
	name: string;
	created_at: ColumnType<Date, string | undefined, never>;
}

export type Category = Selectable<CategoryTable>;
export type NewCategory = Insertable<CategoryTable>;
export type CategoryUpdate = Updateable<CategoryTable>;
