import { Display, type ScreenState } from '$lib/assets/screen/screenStates';
import { cards } from '$lib/library';
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

	let Borrower: { id: string; items: { id: string; title: string; expires: Date }[] };

	function Borrower_items() {
		return Borrower.items;
	}

	function Borrower_isLoggedIn() {
		return !!Borrower.id;
	}

	function Borrower_login(userId: string) {
		rebind(userId);
		Screen_displayItems();
	}

	function Borrower_logout() {
		if (Borrower_isLoggedIn()) {
			rebind(undefined);
		}
		Screen_displayThankYou();
	}

	//#endregion

	//#region CardReader /////

	const CardReader: { currentId: string; attempts: number } = { currentId: '', attempts: 0 };

	function CardReader_cardScanned(id: string | undefined) {
		if (CardReader.currentId == id) return;

		if (!id) {
			// Card removed or missing
			if (CardReader.currentId) Borrower_logout();
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
		Screen_displayThankYou();
	}

	function CardReader_validatePIN(pin: string[]) {
		Library_validateCard(CardReader.currentId, pin);
	}

	function CardReader_PINfailed() {
		Screen_displayEnterPIN(++CardReader.attempts);
	}

	//#endregion

	//#region Library /////

	const Library = {
		cards: cards as { id: string; pin: number }[]
	};

	function Library_validateCard(cardId: string, pin: string[]) {
		const card = Library.cards.find((card) => card.id === cardId);
		if (card && card.pin === Number(pin.join(''))) {
			Borrower_login(card.id);
		} else {
			CardReader_PINfailed();
		}
	}

	function Library_lendItem(itemId: string | undefined) {
		// TODO: Built-in security (assertions) for required login
		if (!Borrower_isLoggedIn() || !itemId) return;

		// Call nested context
		const error = BorrowItem(Borrower, { id: itemId }, Borrower_items());

		if (error) Screen_displayError(error);
		else Screen_displayItems();
	}

	//#endregion

	//#region Scanner /////

	//const Scanner = {};
	// function Scanner_itemScanned(id: string | undefined) {
	// 	// TODO: Built-in security (assertions) for required login
	// 	if (!Borrower_isLoggedIn() || !id) return;
	// 	Library_borrowItem(id);
	// }

	//#endregion

	//#region Screen /////

	function Screen_displayWelcome() {
		Screen.display({ display: Display.Welcome });
	}

	function Screen_displayEnterPIN(attempts: number) {
		Screen.display({ display: Display.EnterPIN, attempts });
	}

	function Screen_displayItems() {
		if (!Borrower_isLoggedIn()) return;
		Screen.display({ display: Display.Items, items: Borrower_items() });
	}

	function Screen_displayThankYou() {
		Screen.display({ display: Display.ThankYou });
		Screen__displayNext({ display: Display.Welcome });
	}

	function Screen_displayError(error: Error) {
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

	async function Printer_printReceipt() {
		const items = Borrower_items();
		if (items.length) {
			await Printer__printLine(new Date().toISOString().slice(0, 10));
			await Printer__printLine('');
			for (const item of items) {
				await Printer__printLine(item.title);
				await Printer__printLine('Return on ' + item.expires.toISOString().slice(0, 10));
				await Printer__printLine('');
			}
		}

		Borrower_logout();
	}

	async function Printer__printLine(line: string) {
		Printer.print(line);
		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	//#endregion

	function rebind(userId: string | undefined) {
		Borrower = { id: userId ?? '', items: [] };
		CardReader_resetAttempts();
	}

	{
		rebind(undefined);
		Screen_displayWelcome();

		return {
			cardScanned(id: string | undefined) {
				CardReader_cardScanned(id);
			},

			itemScanned(id: string | undefined) {
				Library_lendItem(id);
			},

			pinEntered(pin: string[]) {
				CardReader_validatePIN(pin);
			},

			finish(receipt: boolean) {
				if (receipt) Printer_printReceipt();
				else Borrower_logout();
			}
		};
	}
}
