import { z } from 'zod';
import { id } from './common';

export const cardSchema = z.object({
	id: id
});

export type Card = z.infer<typeof cardSchema>;
