import React, { useEffect, useState } from "react";
import {
  getLocalStorageEntity,
  setLocalStorageEntity,
} from "../../services/utils";
import { Book, Books } from "../../types";
import { Button } from "../Button";
import "./index.scss";

interface Props {
  books: Books;
  setBooks: (b: Books) => void;
}

export const SortControls: React.FC<Props> = ({ books, setBooks }) => {
  const [currentSort, setCurrentSort] = useState("");

  useEffect(() => {
    const storedSort = getLocalStorageEntity("currentSort") || "title";
    setCurrentSort(storedSort);
  }, []);

  const handleChangeSort = (sortField: string) => {
    let sortedBooks = books;

    if (sortField === "title") {
      sortedBooks =
        sortedBooks.length > 1
          ? [...sortedBooks].sort((a, b) => a.title!.localeCompare(b.title!))
          : sortedBooks;
    } else {
      sortedBooks =
        sortedBooks.length > 1
          ? [...sortedBooks].sort((a: Book, b: Book) => {
              const num1 = a.publicationYear
                ? new Date(a.publicationYear)
                : new Date();
              const num2 = b.publicationYear
                ? new Date(b.publicationYear)
                : new Date();
              return num1.getTime() - num2.getTime();
            })
          : sortedBooks;
    }

    setBooks(sortedBooks);
    setCurrentSort(sortField);
    setLocalStorageEntity("currentSort", sortField);
    setLocalStorageEntity("storedBooks", sortedBooks);
  };

  return (
    <div className="sort">
      <p className="sort__label">Sort by:</p>
      <div className="sort__controls">
        <Button
          template="sortButton"
          onClick={() => handleChangeSort("title")}
          disabled={currentSort === "title"}
        >
          Title
        </Button>
        <Button
          template="sortButton"
          onClick={() => handleChangeSort("publicationYear")}
          disabled={currentSort === "publicationYear"}
        >
          Publication Year
        </Button>
      </div>
    </div>
  );
};
