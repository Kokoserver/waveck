import { z } from 'zod';

export const userRegistrationValidator = z.object({
	first_name: z.string().min(2, 'first name must be at least 2 characters'),
	last_name: z.string().min(2, 'last name must be at least 2 characters'),
	email: z.string().email('please enter a valid email address'),
	password: z
		.string()
		.min(8, 'password must be at least 8 character long')
		.max(30)
});

export const forgot_password = z.object({
	email: z.string().email()
});

export const login = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(30)
});

export const reset_password = z.object({
	password: z.string().min(8).max(30),
	token: z.string().min(5)
});
