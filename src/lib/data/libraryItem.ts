import { z } from 'zod';
import { thing, namedThing } from './common';

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
	duration: z.string().regex(/^PT(?:\d+H)?(?:\d+M)?(?:\d+S)?$/)
});

/**
 * https://schema.org/VideoObject
 */
const video = thing('VideoObject').extend({
	videoQuality: z.enum(['DVD', 'BD']),
	encodesCreativeWork: movie
});

/**
 * https://schema.org/IndividualProduct
 */
const disc = thing('IndividualProduct').extend({
	_content: video
});

export const libraryItemSchema = book.or(disc);

export type LibraryItem = z.infer<typeof libraryItemSchema>;

export function title(item: LibraryItem) {
	return item['@type'] === 'Book' ? item.name : item._content.encodesCreativeWork.name;
}
