import type { Library, LibraryCard, Loan } from './data/library';
import { nanoid } from 'nanoid';

// "Database" for the library

export const library: Library = {
	'@id': nanoid(),
	'@type': 'Library',
	name: 'Gutenberg',
	member: [{ '@id': nanoid(), '@type': 'Person', name: 'John Borrower' }],
	makesOffer: [
		{
			'@id': nanoid(),
			'@type': 'Offer',
			businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
			itemOffered: {
				'@id': nanoid(),
				'@type': 'Book',
				name: 'Master and Man',
				numberOfPages: 200,
				isbn: '9783164841001'
			}
		},
		{
			'@id': nanoid(),
			'@type': 'Offer',
			businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
			itemOffered: {
				'@id': nanoid(),
				'@type': 'Book',
				name: 'Crime and Punishmant',
				numberOfPages: 852,
				isbn: '9783144849321'
			}
		},
		{
			'@id': nanoid(),
			'@type': 'Offer',
			businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
			itemOffered: {
				'@id': nanoid(),
				'@type': 'IndividualProduct',
				additionalType: {
					'@id': nanoid(),
					'@type': 'VideoObject',
					videoQuality: 'BD',
					encodesCreativeWork: {
						'@id': nanoid(),
						'@type': 'Movie',
						duration: 'PT3H15M',
						name: 'War and Peace'
					}
				}
			}
		}
	]
};

export const cards: LibraryCard[] = [
	{
		'@id': nanoid(),
		'@type': 'IndividualProduct',
		identifier: '1234',
		purchaseDate: new Date('2024-12-01')
	}
];

export const loans: Loan[] = [];
