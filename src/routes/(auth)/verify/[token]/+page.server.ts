import { error } from '@sveltejs/kit';
import { db } from '$lib/db/index.js';

import { verifyToken } from '$lib/utils';

export const load = async ({ params, url }) => {
	const { token } = params;
	const redirectTo = url.searchParams.get('redirectTo');
	const decoded = verifyToken(token.split('token=')[1]) as { id: number };

	if (!decoded) {
		error(400, { message: 'Invalid token' });
	}
	const user = await db
		.selectFrom('user')
		.where('id', '=', decoded.id)
		.selectAll()
		.executeTakeFirst();
	if (!user) {
		error(404, { message: 'User not found' });
	}
	if (user?.is_active) {
		error(400, { message: 'Account is already verified' });
	}
	await db
		.updateTable('user')
		.set({ is_active: true })
		.returning(['id'])
		.executeTakeFirst();
	return {
		message: 'Account  was verified successfully',
		isError: false,
		redirectTo
	};
};
