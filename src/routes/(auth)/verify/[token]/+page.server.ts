import { fail } from '@sveltejs/kit';
import { db } from '$lib/db/index.js';

import { verifyToken } from '$lib/utils';

export const load = async ({ params }) => {
	const { token } = params;
	const decoded = verifyToken(token) as { id: number };
	if (!decoded) {
		fail(400, { message: 'Invalid token' });
	}
	const user = await db
		.selectFrom('user')
		.where('id', '=', decoded.id)
		.executeTakeFirst();
	if (!user) {
		fail(404, { message: 'User not found' });
	}
	await db
		.updateTable('user')
		.set({ is_active: true })
		.returning(['id'])
		.executeTakeFirst();
	return { message: 'Account  was verified successfully' };
};
