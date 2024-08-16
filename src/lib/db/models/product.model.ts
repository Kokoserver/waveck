import type {
	ColumnType,
	Generated,
	Insertable,
	JSONColumnType,
	Selectable,
	Updateable
} from 'kysely';

export interface ProductTable {
	id: Generated<number>;
	name: string;
	description: string;
	cover_image: string | null;
	rating: number | null;
	price: number | null;
	quantity: number | null;
	category_id: number | null;
	in_stock: boolean | null;
	properties: JSONColumnType<
		{
			name: string;
			value: string;
		}[]
	>;
	created_at: ColumnType<Date, string | undefined, never>;
}

export type Product = Selectable<ProductTable>;
export type NewProduct = Insertable<ProductTable>;
export type ProductUpdate = Updateable<ProductTable>;
