export interface RfidScanner {
	scan: (item: Record<string, unknown> | undefined) => void;
}

export class ObjectRfidScanner implements RfidScanner {
	constructor(private scanned: (rfid: string | undefined) => void) {}

	// TODO: Start and stop, for realtime scanning? Right now using only scan.

	public scan(item: Record<string, unknown> | undefined) {
		if (!item || !this.hasId(item)) this.scanned(undefined);
		else this.scanned(item.id);
	}

	private hasId<T extends Record<string, unknown>>(object: T): object is T & { id: string } {
		return 'id' in object;
	}
}
