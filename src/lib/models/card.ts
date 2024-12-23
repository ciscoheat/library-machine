import { z } from 'zod';
import { rfid } from './common';

export const cardSchema = z.object({
	rfid
});

export type Card = z.infer<typeof cardSchema>;
