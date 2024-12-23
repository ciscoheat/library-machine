import { z } from 'zod';
import { charString, idString } from './common';

export const userSchema = z.object({
	id: idString(1),
	name: charString(2)
});

export type User = z.infer<typeof userSchema>;
