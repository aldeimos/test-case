import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  getLocalStorageEntity,
  getRandomInt,
  setLocalStorageEntity,
} from "../../services/utils";
import { Books } from "../../types";
import { Nullable } from "../../types/common";
import { Button } from "../Button";
import { AuthorCreator } from "../FormControls/AuthorCreator";
import { DatePicker } from "../FormControls/DatePicker";
import { ImageUploader } from "../FormControls/ImageUploader";
import { NumberInput } from "../FormControls/NumberInput";
import { TextInput } from "../FormControls/TextInput";
import "./index.scss";

const requiredFields = ["title", "authors", "pagesCount"];

const fallbackData: { [key: string]: Nullable<any> } = {
  id: null,
  title: null,
  authors: [],
  pagesCount: null,
  publisherName: null,
  publicationYear: undefined,
  releaseDate: undefined,
  isbn: null,
  cover: null,
};

interface Props {
  bookToMutate?: {
    id: string;
    title: null;
    authors: [
      {
        id: string;
        firstName: null;
        lastName: null;
      }
    ];
    pagesCount: null;
    publisherName: null;
    publicationYear: undefined;
    releaseDate: undefined;
    isbn: null;
    cover: null;
  };
  editBookId?: string;
}

export const BookForm: React.FC<Props> = ({
  bookToMutate,
  editBookId = null,
}) => {
  const history = useHistory();
  const [storedBooks, setStoredBooks] = useState<Books>([]);
  const [formData, setFormData] = useState(bookToMutate || fallbackData);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const stored = getLocalStorageEntity("storedBooks");
    setStoredBooks(stored || []);
  }, []);

  const handleFormData = (value: any, field: string) => {
    setIsError(false);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateFormData = () => {
    let error = false;

    for (let el of requiredFields) {
      const currentField = formData[el];
      if (
        !currentField ||
        (Array.isArray(currentField) && currentField.length === 0)
      ) {
        error = true;
        break;
      }
    }

    setIsError(error);
    return error;
  };

  const saveBooksToLocalStorage = (
    booksToSave: { [key: string]: Nullable<any> }[]
  ) => {
    setLocalStorageEntity("storedBooks", booksToSave);
    history.push("/");
  };

  const handleCalculateISBN = () => {
    const str = `978-5-${getRandomInt(10, 1000)}-${getRandomInt(
      100000,
      200000
    )}-${getRandomInt(0, 9)}`;
    return str;
  };

  const handleSubmit = () => {
    const newBook = {
      ...formData,
      id: nanoid(),
      isbn: handleCalculateISBN(),
    };
    const booksToSave = [...storedBooks, newBook];

    saveBooksToLocalStorage(booksToSave);
  };

  const handleEdit = () => {
    const editBook = { ...formData };
    const booksToSave = storedBooks.map((book) => {
      if (book.id === editBookId) {
        return {
          ...editBook,
        };
      } else return book;
    });

    saveBooksToLocalStorage(booksToSave);
  };

  const handleFormAction = () => {
    const error = validateFormData();

    if (error) {
      return;
    }

    if (editBookId) {
      handleEdit();
    } else {
      handleSubmit();
    }
  };

  return (
    <section className="book-form">
      <div className="container">
        <h1>Add new book</h1>
        <div className="book-form__wrapper">
          <div className="book-form__cover">
            <ImageUploader
              labelText="Upload cover"
              value={formData.cover}
              name="cover"
              onChange={handleFormData}
            />
          </div>
          <div className="book-form__info">
            <TextInput
              value={formData.title}
              labelText="Title*"
              name="title"
              onChange={handleFormData}
              max={30}
            />
            <TextInput
              value={formData.publisherName}
              labelText="Publisher Name"
              name="publisherName"
              onChange={handleFormData}
              max={30}
            />
            <div className="book-form__authors">
              <span className="book-form__authors-title">Authors*</span>
              <AuthorCreator
                authors={formData.authors}
                name="authors"
                onChange={handleFormData}
              />
            </div>
            <NumberInput
              labelText="Pages count*"
              value={formData.pagesCount}
              name="pagesCount"
              onChange={handleFormData}
              min={1}
              max={10000}
            />
            <DatePicker
              labelText="Publication year"
              name="publicationYear"
              value={formData.publicationYear}
              onChange={handleFormData}
            />
            <DatePicker
              labelText="Release date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleFormData}
            />
            {isError && (
              <div className="book-form__error">
                One of the required fields(*) is empty
              </div>
            )}
            <div className="book-form__submit">
              <Button onClick={handleFormAction} disabled={isError}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
