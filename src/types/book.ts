import Author from './author';
import { Nullable } from './common';

interface Book {
  id: Nullable<string>,
  title: Nullable<string>,
  authors: Nullable<Author[]>,
  pagesCount: Nullable<number>,
  publisherName?: Nullable<string>,
  publicationYear?: Nullable<Date>,
  releaseDate?: Nullable<Date>,
  isbn?: Nullable<string>,
  cover?: Nullable<string>,
}

type Books = Book[];

export type {
  Book,
  Books
}
