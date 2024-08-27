import { redirect } from '@sveltejs/kit';

import { deleteToken } from '$lib/utils';

export const load = async ({ cookies }) => {
	deleteToken(cookies);
	redirect(302, '/');
};
