import type { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface CartTable {
  id: Generated<number>;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Cart = Selectable<CartTable>;
export type NewCart = Insertable<CartTable>;
export type CartUpdate = Updateable<CartTable>;
