/**
 * @DCI-context
 * Ctrl+K Ctrl+8 folds all Roles.
 */
function LibraryMachine(CardReader, Library) {
	//#region Context state /////

	const Context = {};

	//#endregion

	//#region CardReader /////

	function CardReader_scanForCard() {
		// Access CardReader here
		Library_method();
	}

	//#endregion

	//#region Library /////

	const Library = {};

	function Library_verify(card: string) {
		// Access Library here
	}

	//#endregion

	return {
		start: () => {
			CardReader_method();
		}
	};
}
