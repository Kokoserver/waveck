import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect, error } from '@sveltejs/kit';
import { reset_password } from '$lib/validators/user';
import { db } from '$lib/db/index.js';
import bcrypt from 'bcrypt'; //
import { verifyToken } from '$lib/utils.js';
import type { User } from '$lib/db/models/user.model';
export const load = async () => {
	const form = await superValidate(zod(reset_password));
	return { form };
};

export const actions = {
	async default({ request }) {
		const form = await superValidate(request, zod(reset_password));

		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const check_token = verifyToken(form.data.token) as { id: number };
			if (!check_token) {
				return error(403, { message: 'Token expired' });
			}
			const user = (await db
				.selectFrom('user')
				.where('id', '=', check_token.id)
				.selectAll()
				.executeTakeFirst()) as User;
			if (!user) {
				return error(403, { message: 'Invalid token' });
			}
			const hashed_password = await bcrypt.hash(form.data.password, 10);
			const updatePassword = await db
				.updateTable('user')
				.set({
					password: hashed_password
				})
				.where('id', '=', user.id)
				.executeTakeFirst();

			if (!updatePassword) {
				return error(404, { message: 'User not found' });
			}

			return redirect(301, '/login');
		} catch (e) {
			const { message } = e as { message: string | null };
			fail(500, {
				message: message || 'Error resetting password'
			});
		}
	}
};
