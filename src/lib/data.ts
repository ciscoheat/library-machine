import { z } from 'zod';

export const bookSchema = z.object({
	title: z
		.string()
		.min(1)
		.regex(/^\p{L}/u),
	pages: z.number().min(1)
});
export type Book = z.infer<typeof bookSchema>;
