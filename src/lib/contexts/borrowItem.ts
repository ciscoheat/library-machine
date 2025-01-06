import { loanSchema, type Library, type Loan } from '$lib/data/library';
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
	Loans: Loan[]
) {
	//#region Context /////

	const Context = {
		/** New loan stored here when created, so it can be returned. */
		newLoan: undefined as Loan | undefined
	};

	function Context_loanCreated(loan: Loan) {
		if (Context.newLoan) throw new Error('New loan already created.');
		Context.newLoan = loan;
	}

	function Context_newLoan() {
		if (!Context.newLoan) throw new Error('New loan not created yet.');
		return Context.newLoan;
	}

	//#endregion

	//#region Borrower /////

	function Borrower_id() {
		return Borrower['@id'];
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

		const loan = Loans.find((loan) => loan.object['@id'] === LoanItem_id());
		if (loan) throw new ExpectedError('Item already borrowed.');

		Librarian__verifyID(offer.itemOffered);
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

		// Parse and validate data
		// TODO: Error handling for failed validation
		loanSchema.parse(loan);

		// Add to library database
		Loans.push(loan);

		Context_loanCreated(loan);
	}

	function Librarian__calculateLoanDuration(item: LibraryItem) {
		const add = new Date();
		add.setDate(new Date().getDate() + (item['@type'] == 'Book' ? 14 : 7));
		return add;
	}

	//#endregion

	try {
		Librarian_verifyItem();
		return Context_newLoan();
	} catch (e) {
		if (!(e instanceof ExpectedError)) throw e;
		return e;
	}
}
