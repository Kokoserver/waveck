import { checkUser } from '$lib/utils';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import type { NewCart } from '$lib/db/models/cart.model';
import { AddToCart, cartItemValidator } from '$lib/validators/cart';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
  const user = checkUser(cookies);
  const cartItemForm = await superValidate(zod(cartItemValidator));
  const cartForm = await superValidate(zod(AddToCart));

  const cart = (await db
    .selectFrom('cart')
    .where('user_id', '=', user.id)
    .leftJoin('product', 'product.id', 'cart.product_id')
    .execute()) as NewCart[];
  return { cart, cartForm, cartItemForm };
};

export const actions = {
  async addToCart({ request, cookies }) {
    const user = checkUser(cookies, 'cart');
    const form = await superValidate(request, zod(AddToCart));
    if (!form.valid) {
      return fail(400, { form });
    }
    const get_product = await db
      .selectFrom('product')
      .where('id', '=', form.data.product_id)
      .selectAll()
      .executeTakeFirst();
    if (!get_product) {
      return error(404, {
        message: 'Product not found'
      });
    }
    if (get_product && !get_product.in_stock) {
      return message(form, 'Product is not in stock');
    }
    if (get_product && get_product.quantity! > 0) {
      return message(form, 'Product is not in stock');
    }
    await db
      .insertInto('cart')
      .values({
        user_id: user.id,
        product_id: form.data.product_id,
        quantity: form.data.quantity
      })
      .returning(['id'])
      .executeTakeFirstOrThrow();
    return message(form, 'Product was added to cart successfully');
  },

  async removeCartItem({ request, cookies }) {
    const user = checkUser(cookies, 'cart');
    const form = await superValidate(request, zod(cartItemValidator));
    if (!form.valid) {
      return fail(400, { form });
    }
    const get_product = await db
      .selectFrom('cart')
      .where('id', '=', form.data.item_id)
      .where('user_id', '=', user.id)
      .selectAll()
      .executeTakeFirst();
    if (!get_product) {
      return error(404, {
        message: 'Product not found'
      });
    }
    await db.deleteFrom('cart').where('id', '=', form.data.item_id).executeTakeFirstOrThrow();
    return message(form, 'Product was removed successfully');
  },

  async increaseItem({ request, cookies }) {
    const user = checkUser(cookies, 'cart');
    const form = await superValidate(request, zod(cartItemValidator));
    if (!form.valid) {
      return fail(400, { form });
    }

    const cart = await db
      .selectFrom('cart')
      .where('id', '=', form.data.item_id)
      .where('user_id', '=', user.id)
      .leftJoin('product', 'product.id', 'cart.product_id')
      .select(['id', 'cart.product_id', 'quantity'])
      .selectAll()
      .executeTakeFirst();
    if (!cart) {
      error(404, 'Cart item not found');
    }
    const get_product = await db
      .selectFrom('product')
      .where('id', '=', cart.product_id)
      .selectAll()
      .executeTakeFirst();

    if (!get_product) {
      return error(404, {
        message: 'Product not found'
      });
    }
    if (!get_product.in_stock) {
      return message(form, 'Product is out of stock');
    }
    if (get_product && get_product.quantity! > 0) {
      return message(form, 'Product is not in stock');
    }

    await db
      .updateTable('cart')
      .set('quantity', cart.quantity ? cart.quantity + 1 : 1)
      .executeTakeFirstOrThrow();

    return message(form, 'Item quantity increased successfully');
  },
  async decreaseItem({ request, cookies }) {
    const user = checkUser(cookies, 'cart');
    const form = await superValidate(request, zod(cartItemValidator));
    if (!form.valid) {
      return fail(400, { form });
    }

    const cart = await db
      .selectFrom('cart')
      .where('id', '=', form.data.item_id)
      .where('user_id', '=', user.id)
      .leftJoin('product', 'product.id', 'cart.product_id')
      .select(['id', 'product.discount as proDiscount', 'cart.product_id', 'quantity'])
      .executeTakeFirst();
    if (!cart) {
      error(404, 'Cart item not found');
    }
    const get_product = await db
      .selectFrom('product')
      .where('id', '=', cart.product_id)
      .selectAll()
      .executeTakeFirst();

    if (!get_product) {
      return error(404, {
        message: 'Product not found'
      });
    }
    if (!get_product.in_stock) {
      return message(form, 'Product is out of stock');
    }
    if (get_product && get_product.quantity! > 0) {
      return message(form, 'Product is not in stock');
    }

    if (cart.quantity && cart.quantity > 1) {
      await db
        .updateTable('cart')
        .set('quantity', cart.quantity - 1)
        .executeTakeFirstOrThrow();
      return message(form, 'Item quantity decreased successfully');
    }

    return message(form, 'Item quantity increased successfully');
  }
};
