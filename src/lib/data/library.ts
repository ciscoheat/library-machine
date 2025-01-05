import { z, type ZodTypeAny } from 'zod';
import { stringID, thing, namedThing, relationTo } from './common';
import { libraryItemSchema as libraryItem } from './libraryItem';

/**
 * https://schema.org/Person
 */
const person = namedThing('Person');

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
export const librarySchema = namedThing('Library').extend({
	member: person.array(),
	makesOffer: offer.array()
});

export type Library = z.infer<typeof librarySchema>;

/**
 * https://schema.org/BorrowAction
 */
export const loanSchema = thingAction('BorrowAction', libraryItem).extend({
	lender: relationTo(person),
	startTime: z.date(),
	endTime: z.date()
});

export type Loan = z.infer<typeof loanSchema>;

/**
 * https://schema.org/IndividualProduct
 */
export const libraryCardSchema = thing('IndividualProduct').extend({
	/** PIN code hash */
	identifier: stringID(5),
	purchaseDate: z.date(),
	_owner: relationTo(person)
});

export type LibraryCard = z.infer<typeof libraryCardSchema>;
