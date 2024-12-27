import { Display, type ScreenState } from '$lib/assets/screen/screenStates';
import { cards } from '$lib/library';
import { BorrowItem } from './borrowItem';

/**
 * @DCI-context
 * Ctrl+K Ctrl+8 folds all Roles.
 */
export function LibraryMachine(Screen: {
	display: (state: ScreenState) => void;
	currentState: () => ScreenState;
}) {
	function rebind(userId: string | undefined) {
		Borrower = { id: userId ?? '', items: [] };
		CardReader = { currentId: '', attempts: 0 };
	}

	//#region Borrower /////

	let Borrower: { id: string; items: { id: string; title: string; expires: Date }[] };

	function Borrower_items() {
		return Borrower.items;
	}

	function Borrower_isLoggedIn() {
		return !!Borrower.id;
	}

	//#endregion

	//#region CardReader /////

	let CardReader: { currentId: string; attempts: number };

	function CardReader_cardScanned(id: string | undefined) {
		if (!id) {
			// No card scanned
			if (Borrower_isLoggedIn() || CardReader.currentId) {
				// Card removed
				rebind(undefined);
				Screen_displayThankYou();
			}
		} else {
			// Card scanned
			if (!Borrower_isLoggedIn() && !CardReader.currentId) {
				// New card
				CardReader.currentId = id;
				Screen_displayEnterPIN(CardReader.attempts);
			}
		}
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
			rebind(card.id);
			Screen_displayItems();
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
			}
		};
	}
}
