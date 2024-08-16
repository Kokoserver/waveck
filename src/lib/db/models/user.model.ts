import type {
	ColumnType,
	Generated,
	Insertable,
	JSONColumnType,
	Selectable,
	Updateable
} from 'kysely';

export interface metadata {
	shipping_address: string | null;
	phone_number: string | null;
}
export interface UserTable {
	id: Generated<number>;
	first_name: string;
	user_type: 'user' | 'admin';
	last_name: string | null;
	password: string;
	email: string;
	is_active: boolean;
	created_at: ColumnType<Date, string | undefined, never>;
	metadata: JSONColumnType<metadata> | null;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
