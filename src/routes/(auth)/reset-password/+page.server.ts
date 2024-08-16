import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { reset_password } from '$lib/validators/user';
import { db } from '$lib/db/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; //
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
			// Todo: change secret key for hashing
			const check_token = await jwt.verify(form.data.token, 'sjdhskjdhfskj');
			if (!check_token) {
				return fail(403, { message: 'Token expired' });
			}
			const hashed_password = await bcrypt.hash(form.data.password, 10);
			const user = await db
				.updateTable('user')
				.set({
					password: hashed_password
				})
				.executeTakeFirst();

			if (!user) {
				return fail(404, { message: 'User not found' });
			}

			return redirect(301, '/login');
		} catch (error) {
			console.log(error);
			fail(500, {
				message: 'Error resetting password'
			});
		}
	}
};
