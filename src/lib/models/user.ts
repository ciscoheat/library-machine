import { z } from 'zod';
import { charString, stringID } from './common';

export const userSchema = z.object({
	id: stringID(1),
	name: charString(2),
	validUntil: z.date()
});

export type User = z.infer<typeof userSchema>;
