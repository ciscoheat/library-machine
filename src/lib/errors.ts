// Thanks to https://stackoverflow.com/a/48342359/70894
export class ExpectedError extends Error {
	constructor(message: string) {
		// 'Error' breaks prototype chain here
		super(message);

		// restore prototype chain
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
