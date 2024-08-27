import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail, error } from '@sveltejs/kit';
import { forgot_password } from '$lib/validators/user';
import { db } from '$lib/db/index.js';
import type { User } from '$lib/db/models/user.model';
import { generateToken } from '$lib/utils';
import { transporter } from '$lib/mailer/setup';
import { passwordResetLink } from '$lib/mailer/sender';
export const load = async () => {
	const form = await superValidate(zod(forgot_password));
	return { form };
};

export const actions = {
	async default({ request, url }) {
		const form = await superValidate(request, zod(forgot_password));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const user = (await db
				.selectFrom('user')
				.where('email', '=', form.data.email)
				.selectAll()
				.executeTakeFirst()) as User;
			if (!user) {
				return message(
					form,
					'If email exist a password reset link should be shown in your email'
				);
			}
			const token = generateToken(
				{ id: user.id },
				{
					expiresIn: '1day'
				}
			);
			const to_url = `${url.host}/reset-password?token=${token}`;
			await transporter.sendMail({
				...{
					from: 'no-reply@waveck.com',
					to: user.email
				},
				html: passwordResetLink(user.first_name, to_url),
				subject: 'Password Reset'
			});
			return message(
				form,
				'If email exist a password reset link should be shown in your email'
			);
		} catch (e) {
			const { message } = e as { message: string | null };
			error(500, {
				message: message || 'Error resetting password'
			});
		}
	}
};
