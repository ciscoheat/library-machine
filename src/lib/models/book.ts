import { z } from 'zod';
import { charString, rfid } from './common';

export const bookSchema = z.object({
	id: rfid,
	title: charString(1),
	pages: z.number().int().min(1)
});

export type Book = z.infer<typeof bookSchema>;
