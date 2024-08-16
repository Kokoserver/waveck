import { z } from 'zod';

export const categoryValidator = z.object({
	name: z.string().max(50)
});

export const categoryDeleteValidator = z.object({
	categoryId: z.number().gt(0)
});
