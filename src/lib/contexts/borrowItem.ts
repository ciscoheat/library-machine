import type { Library, Loan } from '$lib/data/library';
import { title } from '$lib/data/libraryItem';
import { ExpectedError } from '$lib/errors';
import { nanoid } from 'nanoid';

type LibraryItem = Library['makesOffer'][number]['itemOffered'];

/**
 * @DCI-context
 * Ctrl+K Ctrl+8 folds all Roles.
 */
export function BorrowItem(
	// eslint-disable-next-line dci-lint/literal-role-contracts
	Librarian: Library,
	Borrower: { '@id': string; '@type': 'Person' },
	LoanItem: { '@id': string },
	Loans: Loan[],
	Items: { id: string; title: string; expires: Date }[]
) {
	//#region Borrower /////

	function Borrower_id() {
		return Borrower['@id'];
	}

	//#endregion

	//#region Items /////

	function Items_borrowedAlready(id: string) {
		return !!Items.find((item) => item.id === id);
	}

	function Items_addBorrowedItem(item: LibraryItem, expires: Date) {
		Items.push({
			id: item['@id'],
			title: title(item),
			expires
		});
	}

	//#endregion

	//#region LoanItem /////

	function LoanItem_id() {
		return LoanItem['@id'];
	}

	//#endregion

	//#region Librarian /////

	function Librarian__verifyID(item: LibraryItem) {
		const user = Librarian.member.find((user) => user['@id'] === Borrower_id());
		if (!user) throw new ExpectedError('Invalid user.');

		Librarian__lendItem(item);
	}

	function Librarian_verifyItem() {
		const offer = Librarian.makesOffer.find(
			(item) => item.itemOffered['@id'] === LoanItem_id()
		);
		if (!offer) throw new ExpectedError('Item not found.');

		const item = offer.itemOffered;
		if (Items_borrowedAlready(item['@id'])) return;

		const loan = Loans.find((loan) => loan.object['@id'] === LoanItem_id());
		if (loan) throw new ExpectedError('Item already borrowed.');

		Librarian__verifyID(item);
	}

	function Librarian__lendItem(item: LibraryItem) {
		const loan: Loan = {
			'@id': nanoid(),
			'@type': 'BorrowAction',
			object: item,
			startTime: new Date(),
			endTime: Librarian__calculateLoanDuration(item),
			lender: Borrower
		};

		Loans.push(loan);
		Items_addBorrowedItem(item, loan.endTime);
	}

	function Librarian__calculateLoanDuration(item: LibraryItem) {
		const add = new Date();
		add.setDate(new Date().getDate() + (item['@type'] == 'Book' ? 14 : 7));
		return add;
	}

	//#endregion

	try {
		Librarian_verifyItem();
	} catch (e) {
		if (!(e instanceof ExpectedError)) throw e;
		return e;
	}
}
