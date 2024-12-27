import { z } from 'zod';
import { rfid } from './common';

export const cardSchema = z.object({
	id: rfid
});

export type Card = z.infer<typeof cardSchema>;
