import type { LibraryCard } from './data/libraryCard';
import { ItemType, type Bluray, type Book } from './data/libraryItem';
import type { Loan } from './data/loan';
import type { User } from './data/user';

// "Database" for the library

export const items = [
	{
		title: 'Master and Man',
		pages: 200,
		id: 'k9o87e79k8oe7x9o8e9',
		type: ItemType.Book
	} satisfies Book,
	{
		title: 'Crime and Punishment',
		pages: 852,
		id: 'qs48hymbxsoumhta2i',
		type: ItemType.Book
	} satisfies Book,
	{
		title: 'War and Peace',
		length: 195 * 60,
		id: 't80j9u80o98x0pmp6fq',
		type: ItemType.Bluray
	} satisfies Bluray
];

export const users: User[] = [
	{ id: 'abcde', name: 'John Borrower', validUntil: new Date('2028-01-01') }
];

export const cards: LibraryCard[] = [{ id: 'abcde', pin: 1234 }];

export const loans: Loan[] = [];
