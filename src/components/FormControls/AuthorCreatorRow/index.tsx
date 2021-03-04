import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Author } from "../../../types";
import { Nullable } from "../../../types/common";
import { Button } from "../../Button";
import { TextInput } from "../TextInput";
import "./index.scss";

interface Props {
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  id?: string | number;
  onChange: (author: Author) => void;
  onDelete: (id: string) => void;
  disabled: boolean;
}

export const AuthorCreatorRow: React.FC<Props> = ({
  firstName = null,
  lastName = null,
  id = null,
  onChange,
  onDelete,
  disabled = false,
}) => {
  const [currentName, setCurrentName] = useState(firstName);
  const [currentLastName, setCurrentLastName] = useState(lastName);

  useEffect(() => {
    if (currentName?.trim() && currentLastName?.trim()) {
      const id = nanoid();
      onChange({
        id,
        firstName: currentName,
        lastName: currentLastName
      });
    }
  }, [currentName, currentLastName]);


  const handleDeleteAuthor = () => {
    onDelete(id as string);
  };

  return (
    <div className="author-creator-row">
      <div className="author-creator-row__column">
        <TextInput
          labelText="First name"
          value={currentName}
          name="firstName"
          onChange={setCurrentName}
          disabled={disabled}
          max={20}
        />
      </div>
      <div className="author-creator-row__column">
        <TextInput
          labelText="Last name"
          value={currentLastName}
          name="lastName"
          onChange={setCurrentLastName}
          disabled={disabled}
          max={20}
        />
      </div>
      {disabled ? (
        <div className="author-creator-row__delete-icon">
          <Button onClick={handleDeleteAuthor} />
        </div>
      ) : null}
    </div>
  );
};
