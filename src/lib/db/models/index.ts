import type { CartItemTable, CartTable } from './cart.model';
import type { CategoryTable } from './category.model';
import type { OrderItemTable, OrderTable } from './order.model';
import type { ProductTable } from './product.model';
import type { UserTable } from './user.model';

export interface Database {
	user: UserTable;
	categories: CategoryTable;
	products: ProductTable;
	cart: CartTable;
	CartItem: CartItemTable;
	orders: OrderTable;
	orderItems: OrderItemTable;
}
