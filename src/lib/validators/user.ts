import { z } from 'zod';

export const userRegistrationValidator = z.object({
	first_name: z.string(),
	last_name: z.string(),
	email: z.string().email(),
	password: z.string().min(8).max(30)
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
