import { z } from 'zod';
import { charString, rfid } from './common';

export const bookSchema = z.object({
	title: charString(1),
	pages: z.number().int().min(1),
	rfid
});

export type Book = z.infer<typeof bookSchema>;
