import { z, type ZodTypeAny } from 'zod';
import { charString, stringID, nanoID } from './common';

const MIN_ID_SIZE = 17;

/**
 * https://schema.org/Thing
 */
const thing = <const T extends string>(type: T) =>
	z.object({
		'@type': z.literal(type),
		'@id': nanoID(MIN_ID_SIZE)
	});

const namedThing = <const T extends string>(type: T) =>
	thing(type).extend({ name: charString(1) });

const relationTo = <const T extends string>(obj: ReturnType<typeof thing<T>>) =>
	obj.pick({ '@type': true, '@id': true });

/**
 * https://schema.org/Person
 */
const person = namedThing('Person');

/**
 * https://schema.org/Book
 */
const book = namedThing('Book').extend({
	numberOfPages: z.number().int().min(0),
	isbn: z.string().regex(/^97[89]\d{10}$/)
});

/**
 * https://schema.org/Movie
 */
const movie = namedThing('Movie').extend({
	duration: z.string()
});

/**
 * https://schema.org/VideoObject
 */
const video = thing('VideoObject').extend({
	videoQuality: z.enum(['DVD', 'BD']),
	encodesCreativeWork: movie
});

const disc = thing('IndividualProduct').extend({
	additionalType: video
});

const libraryItem = book.or(disc);

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
const thingAction = <const T extends string, O extends ZodTypeAny>(type: T, object: O) =>
	thing(type).extend({
		object
	});

/**
 * https://schema.org/Library
 */
export const library = namedThing('Library').extend({
	member: person.array(),
	makesOffer: offer.array()
});

export type Library = z.infer<typeof library>;

/**
 * https://schema.org/BorrowAction
 */
export const loan = thingAction('BorrowAction', libraryItem).extend({
	lender: relationTo(person),
	startTime: z.date(),
	endTime: z.date()
});

export type Loan = z.infer<typeof loan>;

/**
 * https://schema.org/IndividualProduct
 */
export const libraryCard = thing('IndividualProduct').extend({
	/** PIN code */
	identifier: stringID(4),
	purchaseDate: z.date()
});

export type LibraryCard = z.infer<typeof libraryCard>;
