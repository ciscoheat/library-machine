export function shuffle<T>(array: Iterable<T>): T[] {
	const output = [...array];
	for (let i = output.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[output[i], output[j]] = [output[j], output[i]];
	}
	return output;
}

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

export const seed = function (s: number) {
	return function () {
		s = Math.sin(s) * 10000;
		return s - Math.floor(s);
	};
};

export const sum = function (...args: number[]) {
	return args.reduce((a, b) => a + b, 0);
};
