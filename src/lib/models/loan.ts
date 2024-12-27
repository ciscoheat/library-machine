import { z } from 'zod';
import { rfid } from './common';

export const loanSchema = z.object({
	userId: rfid,
	itemId: rfid,
	expires: z.date()
});

export type Loan = z.infer<typeof loanSchema>;
