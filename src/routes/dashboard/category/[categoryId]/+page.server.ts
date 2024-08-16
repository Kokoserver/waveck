import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { categoryValidator, categoryDeleteValidator } from '$lib/validators/category';
import { db } from '$lib/db/index.js';
export const load = async () => {
	const form = await superValidate(zod(categoryValidator), {
		id: 'createCategory'
	});
	const categoryUpdateForm = await superValidate(zod(categoryDeleteValidator), {
		id: 'updateCategory'
	});
	return { form, categoryUpdateForm };
};

export const actions = {
	async create({ request, params }) {
		const { categoryId } = params;
		const form = await superValidate(request, zod(categoryValidator), {
			id: 'createCategory'
		});
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const category = await db
				.selectFrom('categories')
				.where('id', '=', +categoryId)
				.select(['name', 'id'])
				.executeTakeFirst();
			if (!category) {
				return fail(404, { message: 'Category not found' });
			}

			const check_existing = await db
				.selectFrom('categories')
				.where('name', 'ilike', form.data.name)
				.select(['name', 'id'])
				.executeTakeFirst();

			if (check_existing && check_existing.id !== category.id) {
				return setError(form, 'name', 'Category name already exist');
			}

			await db
				.updateTable('categories')
				.set({
					name: form.data.name
				})
				.where('id', '=', +categoryId)
				.returning(['id', 'name'])
				.executeTakeFirst();
			return message(form, 'category was created successfully');
		} catch (error) {
			console.log(error);
			fail(500, {
				message: 'Error resetting password'
			});
		}
	},
	async remove({ request }) {
		const form = await superValidate(request, zod(categoryDeleteValidator), {
			id: 'createCategory'
		});
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const category = await db
				.selectFrom('categories')
				.where('id', '=', form.data.categoryId)
				.select(['name', 'id'])
				.executeTakeFirst();
			if (!category) {
				return fail(404, { message: 'Category not found' });
			}

			await db
				.deleteFrom('categories')
				.where('id', '=', form.data.categoryId)
				.returning(['name', 'id'])
				.executeTakeFirst();
			return message(form, 'category was deleted successfully');
		} catch (error) {
			console.log(error);
			fail(500, {
				message: 'Error resetting password'
			});
		}
	}
};
