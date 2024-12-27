import { ExpectedError } from '$lib/errors';
import { items, users, loans, loanExpires } from '$lib/library';

//type LoanItem = { title: string; expires: Date };

/**
 * @DCI-context
 * Ctrl+K Ctrl+8 folds all Roles.
 */
export function BorrowItem(
	Borrower: { id: string },
	LoanItem: { id: string },
	Items: { id: string; title: string; expires: Date }[]
) {
	//#region Borrower /////

	function Borrower_id() {
		return Borrower.id;
	}

	//#endregion

	//#region Items /////

	function Items_borrowedAlready(id: string) {
		return !!Items.find((item) => item.id === id);
	}

	function Items_borrowItem(item: { id: string; title: string }, expires: Date) {
		Items.push({
			id: item.id,
			title: item.title,
			expires
		});
	}

	//#endregion

	//#region LoanItem /////

	function LoanItem_id() {
		return LoanItem.id;
	}

	//#endregion

	//#region Librarian /////

	const Librarian: {
		users: { id: string; validUntil: Date }[];
		items: { id: string; title: string }[];
		loans: { userId: string; itemId: string; expires: Date }[];
	} = {
		items,
		users,
		loans
	};

	function Librarian__verifyID(item: { id: string; title: string }) {
		const user = Librarian.users.find((user) => user.id === Borrower_id());
		if (!user) throw new ExpectedError('Invalid user.');
		if (user.validUntil < new Date()) {
			throw new ExpectedError('Library card expired.');
		}

		Librarian__lendItem(item);
	}

	function Librarian_verifyItem() {
		const item = Librarian.items.find((item) => item.id === LoanItem_id());
		if (!item) throw new ExpectedError('Item not found.');

		if (Items_borrowedAlready(item.id)) return;

		const loan = Librarian.loans.find((loan) => loan.itemId === LoanItem_id());
		if (loan) throw new ExpectedError('Item already borrowed.');

		Librarian__verifyID({ id: item.id, title: item.title });
	}

	function Librarian__lendItem(item: { id: string; title: string }) {
		const loan = {
			userId: Borrower_id(),
			itemId: item.id,
			expires: loanExpires()
		};

		Librarian.loans.push(loan);
		Items_borrowItem(item, loan.expires);
	}

	//#endregion

	try {
		Librarian_verifyItem();
	} catch (e) {
		if (!(e instanceof ExpectedError)) throw e;
		return e;
	}
}
