interface AuthorAttributes {
  id: number;
  name: string;
}

type AuthorConstructor = Omit<AuthorAttributes, "id">;

export class Author implements AuthorAttributes {
  static lastId: number = 0;

  id: number;

  name: string;

  constructor({ name }: AuthorConstructor) {
    Author.lastId += 1;
    this.id = Author.lastId;
    this.name = name;
  }
}
