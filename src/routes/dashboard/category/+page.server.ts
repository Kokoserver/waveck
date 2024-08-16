import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { categoryValidator } from '$lib/validators/category';
import { db } from '$lib/db/index.js';

import type { User } from '$lib/db/models/user.model';
export const load = async () => {
	const form = await superValidate(zod(categoryValidator));
	return { form };
};

export const actions = {
	async create({ request }) {
		const form = await superValidate(request, zod(categoryValidator));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const user = (await db
				.selectFrom('categories')
				.where('name', '=', form.data.name)
				.executeTakeFirst()) as User;
			if (user) {
				return setError(form, 'name', 'category already exist');
			}
			await db
				.insertInto('categories')
				.values({
					name: form.data.name
				})

				.executeTakeFirst();
			return message(form, 'Category added successfully');
		} catch (error) {
			console.log(error);
			fail(500, {
				message: 'Error resetting password'
			});
		}
	}
};
