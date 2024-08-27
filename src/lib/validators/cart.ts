import { z } from 'zod';

export const cartItemValidator = z.object({
  item_id: z.number()
});

export const AddToCart = z.object({
  product_id: z.number(),
  quantity: z.number().gt(0, 'quantity must be greater than 0').default(1)
});
