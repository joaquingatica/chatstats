import { Author } from "./author.ts";

export enum MessageType {
  Text = "TEXT",
  Media = "MEDIA",
  Notification = "NOTIFICATION"
}

interface MessageAttributes {
  dateTime: Date;
  author: Author;
  type: MessageType;
  content: string;
}

export class Message implements MessageAttributes {
  dateTime: Date;

  author: Author;

  type: MessageType;

  content: string;

  constructor({ dateTime, author, type, content }: MessageAttributes) {
    this.dateTime = dateTime;
    this.author = author;
    this.type = type;
    this.content = content;
  }
}
