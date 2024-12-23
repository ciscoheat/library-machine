import { z } from 'zod';

export const cardSchema = z.object({
	id: z.string().min(1).regex(/^\w+$/),
	pin: z.string().min(1).regex(/^\d+$/)
});

export type Card = z.infer<typeof cardSchema>;
