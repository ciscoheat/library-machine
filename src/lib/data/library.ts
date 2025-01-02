import { z } from 'zod';
import { charString, stringID, intID } from './common';

/**
 * https://schema.org/Thing
 */
const thing = <const T extends string>(type: T) =>
	z.object({
		'@type': z.literal(type),
		name: charString(1),
		id: intID
	});

const product = thing;

/**
 * https://schema.org/Person
 */
const person = thing('Person');

const book = thing('Book').extend({
	numberOfPages: z.number().int().min(0),
	isbn: z.string().regex(/^97[89]\d{10}$/)
});

/**
 * https://schema.org/Movie
 */
const movie = thing('Movie').extend({
	duration: z.string()
});

const libraryItem = book.or(movie);

/**
 * https://schema.org/Offer
 */
const offer = thing('Offer').extend({
	businessFunction: z.literal('http://purl.org/goodrelations/v1#LeaseOut'),
	//gtin13: z.string().regex(/^97[89]\d{10}$/),
	itemOffered: libraryItem
});

/**
 * https://schema.org/Action
 */
const itemAction = <const T extends string>(type: T) =>
	thing(type).extend({
		object: libraryItem,
		startTime: z.date(),
		endTime: z.date()
	});

/**
 * https://schema.org/Library
 */
export const library = thing('Library').extend({
	name: charString(1),
	member: person.array(),
	makesOffer: offer.array()
});

export const loan = itemAction('BorrowAction').extend({
	lender: person
});

export const libraryCard = product('IndividualProduct').extend({
	pin: stringID(1),
	loans: loan.array()
});

/*
export type Library = z.infer<typeof library>;
export type LibraryItem = z.infer<typeof libraryItem>;
export type Loan = z.infer<typeof loan>;
*/
