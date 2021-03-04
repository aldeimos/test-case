import React from "react";
import { setLocalStorageEntity } from "../../services/utils";
import { Books } from "../../types/book";
import { BookCard } from "../BookCard";
import { Link } from "../Link";
import { Placeholder } from "../Placeholder";
import "./index.scss";

interface Props {
  bookList: Books;
  setBooks: (val: Books) => void;
}

export const BookList: React.FC<Props> = ({ bookList, setBooks }) => {
  const handleDeleteBook = (id: string) => {
    const filteredBooks = bookList.filter((book) => book.id !== id);
    setLocalStorageEntity("storedBooks", filteredBooks);
    setBooks(filteredBooks);
  };

  const mappedBooks =
    bookList.length > 0 ? (
      bookList.map((book) => (
        <BookCard key={book.id} onDelete={handleDeleteBook} {...book} />
      ))
    ) : (
      <Placeholder text="The library is empty" />
    );

  return (
    <section className="book-list">
      <div className="book-list__wrapper">{mappedBooks}</div>
      <Link to="/add" template="buttonLike">
        Add new book
      </Link>
    </section>
  );
};
