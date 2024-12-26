export interface Printer {
	print: (line: string) => void;
}

export class ArrayPrinter implements Printer {
	lines: string[] = $state([]);

	constructor() {}

	public print(line: string) {
		this.lines.push(line);
	}
}
