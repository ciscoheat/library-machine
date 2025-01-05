import { z } from 'zod';

export const intID = z.number().int().min(1);

export const stringID = (minLength: number) =>
	z
		.string()
		.min(minLength)
		.regex(/^[\w-]+$/);

export const nanoID = (minLength: number) =>
	z
		.string()
		.min(minLength)
		.regex(/^[\w-]+$/);

export const charString = (minLength: number) =>
	z
		.string()
		.min(minLength)
		.regex(/^\p{L}/u);
