import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { login } from '$lib/validators/user';
import { db } from '$lib/db/index.js';
import bcrypt from 'bcrypt';
import type { User } from '$lib/db/models/user.model';
export const load = async () => {
	const form = await superValidate(zod(login));
	return { form };
};

export const actions = {
	async default({ request }) {
		const form = await superValidate(request, zod(login));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const user = (await db
				.selectFrom('user')
				.where('email', '=', form.data.email)
				.executeTakeFirst()) as User;
			if (!user) {
				return message(form, 'invalid email or password');
			}
			const isValid = await bcrypt.compare(user.password, form.data.password);
			if (!isValid) {
				return message(form, 'invalid email or password');
			} else {
				// Todo: log user in
				return message(form, 'If email exist a password reset link should be shown in your email');
			}
		} catch (error) {
			console.log(error);
			fail(500, {
				message: 'Error resetting password'
			});
		}
	}
};
