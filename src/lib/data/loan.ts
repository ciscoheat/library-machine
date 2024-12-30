import { z } from 'zod';
import { id } from './common';

export const loanSchema = z.object({
	userId: id,
	itemId: id,
	expires: z.date()
});

export type Loan = z.infer<typeof loanSchema>;
