import { fail, redirect, type Cookies } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { writeFile } from 'fs/promises';

import { SECRET_KEY } from '$env/static/private';
import { authKey } from './constant';
import bcrypt from 'bcrypt';
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY, {
      algorithms: ['HS256']
    });
  } catch (e) {
    console.error(e);
    redirect(302, '/login');
  }
};

export const checkUser = (cookies: Cookies, redirectTo: string = '') => {
  const user = validateUser(cookies);
  if (user) {
    return user;
  }
  redirect(302, `/login/${redirectTo && `?redirectTo=${redirectTo}`}`);
};

export const generateToken = (data: object, options?: object) => {
  return jwt.sign(data, SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '24h',
    ...options
  });
};

export const deleteToken = (cookies: Cookies) => {
  cookies.delete(authKey, {
    path: '/'
  });
};

export const setToken = (cookies: Cookies, token: string) => {
  cookies.set(authKey, token, {
    path: '/',
    httpOnly: process.env.NODE_ENV === 'production' ? true : false,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: 'lax'
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
    fail(400, {
      message: message ?? 'Authentication failed'
    });
  }
};

export const verifyPassword = async (hashedPassword: string, plainPassword: string) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const hashPassword = async (plainPassword: string) => {
  return await bcrypt.hash(plainPassword, 10);
};

export function generateRandomAlphanumericString(length = 10) {
  let result = '';
  const characters = crypto.randomUUID().toString();
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function upload_file(file: File | File[], file_path = 'uploads') {
  if (!file) return;
  if (Array.isArray(file)) {
    for (let i = 0; i < file.length; i++) {
      const file_ob = file[i] as File;
      const file_name = `${generateRandomAlphanumericString(25)}${file_ob.name.split('.')[-1]}}`;
      await writeFile(`./${file_path}/${file_name}`, await file_ob.text());
    }
  }
}
