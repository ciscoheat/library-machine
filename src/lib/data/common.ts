import { z } from 'zod';

export const stringID = (minLength: number) =>
	z
		.string()
		.min(minLength)
		.regex(/^[\w-]+$/);

export const id = stringID(1);

export const charString = (minLength: number) =>
	z
		.string()
		.min(minLength)
		.regex(/^\p{L}/u);
