import React from "react";
import { BookForm } from "../../components/BookForm";
import { getLocalStorageEntity } from "../../services/utils";
import { RouteComponentProps } from "react-router-dom";
import { Book } from "../../types";

interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params> {}

export const MutateBook: React.FC<Props> = ({ match }) => {
  const id = match.params.id;
  const storedBooks = getLocalStorageEntity("storedBooks");
  const bookToMutate =
    storedBooks && storedBooks.length > 0
      ? storedBooks.filter((book: Book) => book.id === id)[0]
      : null;

  return (
    <div>
      <BookForm bookToMutate={bookToMutate} editBookId={id} />
    </div>
  );
};
