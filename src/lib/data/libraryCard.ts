import { z } from 'zod';
import { stringID } from './common';

export const libraryCardSchema = z.object({
	id: stringID(1),
	pin: z.number().int().min(1000).max(999999)
});

/**
 * https://schema.org/ProgramMembership
 */
export type LibraryCard = z.infer<typeof libraryCardSchema>;
