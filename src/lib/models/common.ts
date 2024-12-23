import { z } from 'zod';

export const seed = function (s: number) {
	return function () {
		s = Math.sin(s) * 10000;
		return s - Math.floor(s);
	};
};

export function hash(s: string) {
	let hash = 0,
		i,
		chr;
	for (i = 0; i < s.length; i++) {
		chr = s.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash.toString();
}

export const idString = (length: number) => z.string().min(length).regex(/\w+/);
export const rfid = idString(1);
export const charString = (length: number) =>
	z
		.string()
		.min(length)
		.regex(/^\p{L}/u);
