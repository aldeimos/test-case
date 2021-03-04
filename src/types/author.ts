import { Nullable } from "./common";

interface Author {
  id: Nullable<string>,
  firstName: Nullable<string>,
  lastName: Nullable<string>,
}

export default Author;