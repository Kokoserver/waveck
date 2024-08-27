import type { CartTable } from './cart.model';
import type { CategoryTable } from './category.model';
import type { OrderItemTable, OrderTable } from './order.model';
import type { ProductTable } from './product.model';
import type { UserTable } from './user.model';

export interface Database {
  user: UserTable;
  categories: CategoryTable;
  product: ProductTable;
  cart: CartTable;
  orders: OrderTable;
  order_items: OrderItemTable;
}
