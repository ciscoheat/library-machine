import type { Book } from '$lib/models/book';
import type { LibraryCard } from './models/libraryCard';
import type { User } from './models/user';

// "Database" for the library

export const books: Book[] = [
	{ title: 'Master and Man', pages: 200, rfid: 'k9o87e79k8oe7x9o8e9' },
	{ title: 'Crime and Punishment', pages: 852, rfid: 'qs48hymbxsoumhta2i' },
	{ title: 'War and Peace', pages: 589, rfid: 't80j9u80o98x0pmp6fq' }
];

export const users: User[] = [{ id: 'abcde', name: 'John Borrower' }];

export const cards: LibraryCard[] = [{ id: 'abcde', pin: 1234 }];
