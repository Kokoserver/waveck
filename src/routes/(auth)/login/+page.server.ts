import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { login } from '$lib/validators/user';
import { db } from '$lib/db/index.js';
import type { User } from '$lib/db/models/user.model';
import {
	generateToken,
	setToken,
	validateUser,
	verifyPassword
} from '$lib/utils';

export const load = async ({ cookies }) => {
	if (validateUser(cookies)) {
		redirect(302, '/');
	}
	const form = await superValidate(zod(login));
	return { form };
};

export const actions = {
	async default({ request, cookies }) {
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
				return message(form, 'Invalid email or password');
			}

			const isValid = await verifyPassword(user.password, form.data.password);
			if (!isValid) {
				return message(form, 'Invalid email or password');
			} else {
				const token = generateToken(user.id);
				setToken(cookies, token);
				return message(
					form,
					'If email exist a password reset link should be shown in your email'
				);
			}
		} catch (error) {
			const { message } = error as { message: string | null };
			fail(500, {
				message: message || 'Error resetting password'
			});
		}
	}
};
