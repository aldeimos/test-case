import React, { useState, useEffect } from "react";
import { BookList } from "../../components/BookList";
import { SortControls } from "../../components/SortControls";
import { Spinner } from "../../components/Spinner";
import { getBooks } from "../../services/api";
import { Books } from "../../types/book";
import "./index.scss";

export const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<Books>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await getBooks(); // TODO useAsyncEffect
      setBooks(result as Books);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="main">
      <div className="container">
        <h1 className="main__title">Library</h1>
        <SortControls books={books} setBooks={setBooks} />
        {!isLoading ? (
          <BookList bookList={books} setBooks={setBooks} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
