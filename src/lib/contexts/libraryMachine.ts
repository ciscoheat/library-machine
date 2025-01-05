import { Display, type ScreenState } from '$lib/assets/screen/screenStates';
import { cards, library, loans } from '$lib/library';
import { hash } from '$lib/utils';
import { BorrowItem } from './borrowItem';

/**
 * @DCI-context
 * Ctrl+K Ctrl+8 folds all Roles.
 */
export function LibraryMachine(
	Screen: {
		display: (state: ScreenState) => void;
		currentState: () => ScreenState;
	},
	Printer: {
		print: (line: string) => void;
	}
) {
	//#region Borrower /////

	let Borrower: {
		'@id': string;
		'@type': 'Person';
		items: { id: string; title: string; expires: Date }[];
	};

	function Borrower_isLoggedIn() {
		// A getter is ok if it is descriptive beyond "get" and returns a boolean
		return !!Borrower['@id'];
	}

	function Borrower_login(user: Pick<typeof Borrower, '@id' | '@type'>) {
		rebind(user['@id']);
		Screen_displayItems(Borrower.items);
	}

	/**
	 * @param forced Whether the logout was forced by the user (e.g. card removed)
	 */
	function Borrower_logout(forced: boolean, printItems: boolean) {
		// Need to print before rebinding, as it will clear the items
		if (printItems) Printer_printReceipt(Borrower.items);

		if (Borrower_isLoggedIn()) rebind(undefined);
		Screen_displayThankYou(forced);
	}

	function Borrower_borrowItem(itemId: string | undefined) {
		// TODO: Built-in security (assertions) for required login
		if (!Borrower_isLoggedIn() || !itemId) return;

		// Call nested context
		const error = BorrowItem(library, Borrower, { '@id': itemId }, loans, Borrower.items);

		if (error) Screen_displayError(error);
		else Screen_displayItems(Borrower.items);
	}

	//#endregion

	//#region CardReader /////

	const CardReader: { currentId: string; attempts: number } = {
		currentId: '',
		attempts: 0
	};

	function CardReader_cardScanned(id: string | undefined) {
		if (CardReader.currentId == id) return;

		if (!id) {
			// Card removed or missing
			if (CardReader.currentId) Borrower_logout(true, false);
		} else {
			// Card scanned
			if (!Borrower_isLoggedIn()) {
				// New card
				Screen_displayEnterPIN(0);
			}
		}

		CardReader.currentId = id ?? '';
	}

	function CardReader_resetAttempts() {
		CardReader.attempts = 0;
	}

	function CardReader_validatePIN(pin: string[]) {
		Library_validateCard(CardReader.currentId, pin);
	}

	function CardReader_PINfailed() {
		// TODO: Force remove card after 3 failed attempts
		Screen_displayEnterPIN(++CardReader.attempts);
	}

	//#endregion

	//#region Library /////

	const Library = {
		cards
	};

	function Library_validateCard(cardId: string, pin: string[]) {
		const card = Library.cards.find((card) => card['@id'] === cardId);
		if (card && card.identifier === hash(pin.join(''))) {
			Borrower_login(card._owner);
		} else {
			CardReader_PINfailed();
		}
	}

	//#endregion

	//#region Screen /////

	function Screen_displayWelcome() {
		Screen.display({ display: Display.Welcome });
	}

	function Screen_displayEnterPIN(attempts: number) {
		Screen.display({ display: Display.EnterPIN, attempts });
	}

	function Screen_displayItems(items: { title: string; expires: Date }[]) {
		Screen.display({ display: Display.Items, items });
	}

	function Screen_displayThankYou(forced: boolean) {
		Screen.display({ display: Display.ThankYou });
		if (forced) Screen__displayNext({ display: Display.Welcome });
	}

	function Screen_displayError(error: Error) {
		// Log out user
		rebind(undefined);
		Screen.display({ display: Display.Error, error });
		Screen__displayNext({ display: Display.Welcome }, 10000);
	}

	function Screen__displayNext(nextState: ScreenState, delay = 5000) {
		const currentState = Screen.currentState();
		setTimeout(() => {
			if (currentState === Screen.currentState()) Screen.display(nextState);
		}, delay);
	}

	//#endregion

	//#region Printer /////

	async function Printer_printReceipt(items: { title: string; expires: Date }[]) {
		if (items.length) {
			await Printer__printLine(new Date().toISOString().slice(0, 10));
			await Printer__printLine('');
			for (const item of items) {
				await Printer__printLine(item.title);
				await Printer__printLine('Return on ' + item.expires.toISOString().slice(0, 10));
				await Printer__printLine('');
			}
		}
	}

	async function Printer__printLine(line: string) {
		Printer.print(line);
		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	//#endregion

	/**
	 * Reset the Context state, rebind to a new user or undefined (not logged in).
	 */
	function rebind(userId: string | undefined) {
		Borrower = { '@id': userId ?? '', '@type': 'Person', items: [] };
		CardReader_resetAttempts();
	}

	{
		// Context start
		rebind(undefined);
		Screen_displayWelcome();

		return {
			cardScanned(id: string | undefined) {
				CardReader_cardScanned(id);
			},

			itemScanned(id: string | undefined) {
				Borrower_borrowItem(id);
			},

			pinEntered(pin: string[]) {
				CardReader_validatePIN(pin);
			},

			finish(printReceipt: boolean) {
				Borrower_logout(false, printReceipt);
			}
		};
	}
}
