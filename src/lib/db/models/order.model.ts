import type {
	ColumnType,
	Generated,
	Insertable,
	JSONColumnType,
	Selectable,
	Updateable
} from 'kysely';

export interface OrderTable {
	id: Generated<number>;
	user_id: number;
	total_price: number;
	created_at: ColumnType<Date, string | undefined, never>;
	status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
	metadata: JSONColumnType<{
		shipping_address: string;
		payment_method: string;
		order_notes: string;
	}>;
}

export interface OrderItemTable {
	id: Generated<number>;
	order_id: number;
	product_id: number;
	quantity: number;
	created_at: ColumnType<Date, string | undefined, never>;
}

export type Cart = Selectable<OrderTable>;
export type NewOrder = Insertable<OrderTable>;
export type OrderUpdate = Updateable<OrderTable>;

export type OrderItem = Selectable<OrderItemTable>;
export type NewOrderItem = Insertable<OrderItemTable>;
export type OrderItemUpdate = Updateable<OrderItemTable>;
