import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { userRegistrationValidator } from '$lib/validators/user';
import { db } from '$lib/db/index.js';
import bcrypt from 'bcrypt'; //
import jwt from 'jsonwebtoken';

export const load = async () => {
	// Form is populated, so errors will be set if validation fails
	const form = await superValidate(zod(userRegistrationValidator));
	return { form };
};

export const actions = {
	async default({ request }) {
		const form = await superValidate(request, zod(userRegistrationValidator));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const user = await db
				.selectFrom('user')
				.where('email', '=', form.data.email)
				.executeTakeFirst();
			if (user) {
				return setError(form, 'email', 'Account already exists.');
			}

			const hashedPassword = await bcrypt.hash(form.data.password, 10);

			const new_user = await db
				.insertInto('user')
				.values({
					first_name: form.data.first_name,
					last_name: form.data.last_name,
					email: form.data.email,
					user_type: 'user',
					is_active: true,
					password: hashedPassword
				})
				.returning(['id', 'email', 'first_name'])
				.executeTakeFirst();
			if (!new_user) {
				return fail(500, { message: 'Failed to create account' });
			}
			// Todo: send verification email to the user
			const token = await jwt.sign({ id: new_user.id }, 'sdkjfkjdhgkj', {
				algorithm: 'HS256',
				expiresIn: '24h'
			});
			// Todo: send account verification mail to the user
			console.log(token);

			return message(form, 'Account created successfully');
		} catch (error) {
			console.log(error);
			fail(500, {
				message: 'Account creation failed'
			});
		}
	}
};
