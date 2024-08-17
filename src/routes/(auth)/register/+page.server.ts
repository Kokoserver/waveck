import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { userRegistrationValidator } from '$lib/validators/user';
import { db } from '$lib/db/index.js';
import { generateToken, hashPassword } from '$lib/utils.js';
import { transporter } from '$lib/mailer/setup';
import { verificationMailTemplate } from '$lib/mailer/sender.js';

export const load = async () => {
	// Form is populated, so errors will be set if validation fails
	const form = await superValidate(zod(userRegistrationValidator));
	return { form };
};

export const actions = {
	async default({ request, url }) {
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

			const hashedPassword = await hashPassword(form.data.password);

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

			const token = generateToken(new_user.id);
			const to_url = `${url.host}/verify/token=${token}`;
			await transporter.sendMail({
				...{
					from: 'no-reply@waveck.com',
					to: new_user.email
				},
				html: verificationMailTemplate(new_user.first_name, to_url),
				subject: 'Verify your email address'
			});
			return message(form, 'Account created successfully');
		} catch (error) {
			console.log(error);
			fail(500, {
				message: 'Account creation failed'
			});
		}
	}
};
