import { z } from 'zod';
import { charString, id } from './common';

export enum ItemType {
	Book = 1,
	Bluray = 2,
	Newspaper = 3
}

/**
 * Abstract base schema for a library item (book, Bluray, newspaper, etc)
 */
const libraryItemSchema = z.object({
	id,
	title: charString(1),
	type: z.nativeEnum(ItemType)
});

export const bookSchema = libraryItemSchema.extend({
	pages: z.number().int().min(1),
	type: z.literal(ItemType.Book)
});

export const bluraySchema = libraryItemSchema.extend({
	/** Seconds  */
	length: z.number().int().min(0),
	type: z.literal(ItemType.Bluray)
});

export type Book = z.infer<typeof bookSchema>;
export type Bluray = z.infer<typeof bluraySchema>;

export type LibraryItem = Book | Bluray;
