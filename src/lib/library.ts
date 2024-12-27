import type { Book } from '$lib/models/book';
import type { LibraryCard } from './models/libraryCard';
import type { Loan } from './models/loan';
import type { User } from './models/user';

// "Database" for the library

export const items: Book[] = [
	{ title: 'Master and Man', pages: 200, id: 'k9o87e79k8oe7x9o8e9' },
	{ title: 'Crime and Punishment', pages: 852, id: 'qs48hymbxsoumhta2i' },
	{ title: 'War and Peace', pages: 589, id: 't80j9u80o98x0pmp6fq' }
];

export const users: User[] = [
	{ id: 'abcde', name: 'John Borrower', validUntil: new Date('2028-01-01') }
];

export const cards: LibraryCard[] = [{ id: 'abcde', pin: 1234 }];

export const loans: Loan[] = [];

export function loanExpires() {
	return new Date(new Date().setDate(new Date().getDate() + 7));
}
