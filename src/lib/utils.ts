import { fail, type Cookies } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '$env/static/private';
import { authKey } from './constant';
import bcrypt from 'bcrypt';
export const verifyToken = (token: string) => {
	return jwt.verify(token, SECRET_KEY);
};

export const checkUser = (cookies: Cookies) => {
	const user = validateUser(cookies);
	if (user) {
		return user;
	}
	return fail(401, {
		message: 'Unauthorized'
	});
};

export const generateToken = (id: number, options?: object) => {
	return jwt.sign({ id }, SECRET_KEY, {
		...options,
		algorithm: 'HS256',
		expiresIn: '24h'
	});
};

export const deleteToken = (cookies: Cookies) => {
	cookies.delete(authKey, {
		path: '/'
	});
};

export const setToken = (cookies: Cookies, token: string) => {
	cookies.set(authKey, token, {
		path: '/'
	});
};

export const validateUser = (cookies: Cookies) => {
	try {
		const token = cookies.get(authKey);
		if (!token) {
			return null;
		}
		const decodedToken = verifyToken(token) as { id: number };
		return decodedToken;
	} catch (error) {
		const { message } = error as { message: string | null };
		deleteToken(cookies);
		return fail(400, {
			message: message ?? 'Authentication failed'
		});
	}
};

export const verifyPassword = async (
	hashedPassword: string,
	plainPassword: string
) => {
	return await bcrypt.compare(hashedPassword, plainPassword);
};

export const hashPassword = async (plainPassword: string) => {
	return await bcrypt.hash(plainPassword, 10);
};
