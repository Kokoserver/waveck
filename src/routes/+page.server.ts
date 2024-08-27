import type { PageServerLoad } from './$types';
import { AddToCart } from '$lib/validators/cart';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = async () => {
  const cartForm = await superValidate(zod(AddToCart));
  return { cartForm };
};
