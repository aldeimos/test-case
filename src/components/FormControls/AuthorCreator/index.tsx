import React, { useEffect, useState } from "react";
import { Author } from "../../../types";
import { Button } from "../../Button";
import { AuthorCreatorRow } from "../AuthorCreatorRow";
import "./index.scss";

type Props = {
  authors: (Author | null)[];
  onChange: (value: any, field: string) => void;
  name: string;
};

export const AuthorCreator: React.FC<Props> = ({ authors, name, onChange }) => {
  const [currentAuthors, setCurrentAuthors] = useState<(Author | null)[]>([]);
  const [currentAuthor, setCurrentAuthor] = useState(
    authors[authors.length - 1]
  );

  useEffect(() => {
    setCurrentAuthors([...authors, null]);
  }, [authors]);

  const handleBubbleState = (author: Author) => {
    setCurrentAuthor(author);
  };

  const handleSaveAuthor = () => {
    let authorsToSave = [...currentAuthors];
    authorsToSave[authorsToSave.length - 1] = currentAuthor;
    authorsToSave.filter((author) => author);

    onChange(authorsToSave, "authors");
  };

  const handleDeleteAuthor = (id: string) => {
    const filteredAuthors = authors.filter((author) => author!.id !== id);
    onChange(filteredAuthors, "authors");
  };

  const renderedAuthors = currentAuthors
    ? (currentAuthors as []).map((author: Author, index: number) => {
        const shouldDisabled = author && author.firstName && author.lastName;

        return (
          <AuthorCreatorRow
            key={(author && author.id) || index}
            id={(author && author.id) || index}
            firstName={author && author.firstName}
            lastName={author && author.lastName}
            onChange={handleBubbleState}
            onDelete={handleDeleteAuthor}
            disabled={!!shouldDisabled}
          />
        );
      })
    : null;

  return (
    <div className="author-creator">
      {renderedAuthors}
      <div className="author-creator__add">
        <Button
          disabled={
            !!(
              currentAuthor &&
              (!currentAuthor.firstName?.trim() ||
                !currentAuthor.lastName?.trim())
            )
          }
          onClick={handleSaveAuthor}
        >
          Add author
        </Button>
      </div>
    </div>
  );
};
