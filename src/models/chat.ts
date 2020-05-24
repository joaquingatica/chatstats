import { Author } from "./author.ts";
import { Message } from "./message.ts";

const systemAuthorName = "System";
const systemAuthor = new Author({ name: systemAuthorName });

export class Chat {
  authors: Record<string, Author> = {
    [systemAuthorName]: systemAuthor
  };

  messages: Message[] = [];

  private static _instance?: Chat;
  static get instance(): Chat {
    if (this._instance != null) {
      return this._instance;
    }
    this._instance = new Chat();
    return this._instance;
  }
  private constructor() {}

  getSystemAuthor() {
    return systemAuthor;
  }

  addAuthorByName(name: string): Author {
    let author = this.authors[name] || null;
    if (!author) {
      author = new Author({ name });
      this.authors[name] = author;
    }
    return author;
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }
}
