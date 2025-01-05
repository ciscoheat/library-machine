import { z } from 'zod';

/**
 * Common Zod validators
 */

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

export const MIN_ID_SIZE = 17;

/**
 * https://schema.org/Thing
 */
export const thing = <const T extends string>(type: T) =>
	z.object({
		'@type': z.literal(type),
		'@id': nanoID(MIN_ID_SIZE)
	});

export const namedThing = <const T extends string>(type: T) =>
	thing(type).extend({ name: charString(1) });

export const relationTo = <const T extends string>(obj: ReturnType<typeof thing<T>>) =>
	obj.pick({ '@type': true, '@id': true });
