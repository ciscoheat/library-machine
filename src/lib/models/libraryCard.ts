import { z } from 'zod';
import { idString } from './common';

export const libraryCardSchema = z.object({
	id: idString(1),
	pin: z.number().int().min(1000).max(999999)
});

export type LibraryCard = z.infer<typeof libraryCardSchema>;
