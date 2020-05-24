import { outputToFile } from "../utils/files.ts";
import { MessageType } from "../models/message.ts";
import { Chat } from "../models/chat.ts";

export interface Stats {
  authors: AuthorValues[];
  messageTypes: string[];
  messages: MessageValues[];
}

interface AuthorValues {
  id: number;
  name: string;
}

interface MessageValues {
  date: Date;
  authorId: number;
  type: string;
  content: string;
}

export async function generateStats(outputPath: string): Promise<Stats> {
  const stats: Stats = {
    authors: serializeAuthors(),
    messageTypes: serializeMessageTypes(),
    messages: serializeMessages()
  };
  await outputToFile(stats, outputPath);
  return stats;
}

function serializeAuthors(): AuthorValues[] {
  return Object.values(Chat.instance.authors).map<AuthorValues>(author => ({
    id: author.id,
    name: author.name
  }));
}

function serializeMessageTypes(): string[] {
  return Object.values(MessageType).map<string>(type => type);
}

function serializeMessages(): MessageValues[] {
  return Chat.instance.messages.map<MessageValues>(message => ({
    date: message.dateTime,
    authorId: message.author.id,
    type: message.type,
    content: message.content
  }));
}
