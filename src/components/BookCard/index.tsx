import React from "react";
import { Book } from "../../types/book";
import "./index.scss";
import { Link } from "react-router-dom";
import { Button } from "../Button";

interface Props extends Book {
  onDelete: (id: string) => void;
}

export const BookCard: React.FC<Props> = ({
  id,
  title,
  authors,
  onDelete,
  pagesCount,
  cover = "",
}) => {
  const renderedAuthors = authors
    ? authors.map((author) => (
        <h3 key={author.id} className="book__author">
          <Link to={`/authors/${author.id}`}>
            {author.firstName} {author.lastName}
          </Link>
        </h3>
      ))
    : null;

  return (
    <div className="book">
      <Link to={`/books/${id}`}>
        <img
          className="book__cover"
          src={cover || "/icons/lost-items.svg"}
          alt={`Обложка книги ${title}`}
        />
      </Link>
      <div className="book__authors">{renderedAuthors}</div>
      <h2 className="book__title">
        <Link to={`/books/${id}`}>{title}</Link>
      </h2>
      <Link to={`/edit/${id}`}>
        <div
          className="book__side-btn book__side-btn_edit"
          style={{
            backgroundImage: `url('/icons/edit.svg')`,
          }}
        />
      </Link>
      <div
        className="book__side-btn book__side-btn_delete"
        style={{
          backgroundImage: `url('/icons/trash.svg')`,
        }}
      >
        <Button onClick={() => onDelete(id as string)} />
      </div>
    </div>
  );
};
