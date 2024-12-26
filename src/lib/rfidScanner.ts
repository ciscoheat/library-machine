export interface RfidScanner {
	scan: (item: Record<string, unknown> | undefined) => void;
}

export class ObjectRfidScanner implements RfidScanner {
	constructor(private scanned: (rfid: string | undefined) => void) {}

	// TODO: Start and stop, for realtime scanning? Right now using only scan.

	public scan(item: Record<string, unknown> | undefined) {
		if (!item || !this.hasRfid(item)) this.scanned(undefined);
		else this.scanned(item.rfid);
	}

	private hasRfid<T extends Record<string, unknown>>(object: T): object is T & { rfid: string } {
		return 'rfid' in object;
	}
}
