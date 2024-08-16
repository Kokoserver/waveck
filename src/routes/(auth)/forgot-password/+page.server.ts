import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { forgot_password } from '$lib/validators/user';
import { db } from '$lib/db/index.js';
import jwt from 'jsonwebtoken';
import type { User } from '$lib/db/models/user.model';
export const load = async () => {
	const form = await superValidate(zod(forgot_password));
	return { form };
};

export const actions = {
	async default({ request }) {
		const form = await superValidate(request, zod(forgot_password));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const user = (await db
				.selectFrom('user')
				.where('email', '=', form.data.email)
				.executeTakeFirst()) as User;
			if (!user) {
				return message(form, 'If email exist a password reset link should be shown in your email');
			}
			const token = jwt.sign(
				{
					id: user.id
				},
				'snmbnsdbfsndbdn',
				{
					algorithm: 'HS256',
					expiresIn: '24h'
				}
			);
			console.log(token);
			// Todo: send password reset link to the user
			return message(form, 'If email exist a password reset link should be shown in your email');
		} catch (error) {
			console.log(error);
			fail(500, {
				message: 'Error resetting password'
			});
		}
	}
};
