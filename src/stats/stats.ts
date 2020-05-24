import { outputToFile } from "../utils/files.ts";
import { Chat } from "../models/chat.ts";
import { Message, MessageType } from "../models/message.ts";
import { dateToSql } from "../utils/dateTimes.ts";

export interface Stats {
  authors: AuthorValues[];
  messageTypes: string[];
  dates: string[];
  messagesPerDate: MessagesPerDate;
}

interface AuthorValues {
  id: number;
  name: string;
}

type MessagesPerDate = Record<string, DateMessages>;

export interface DateMessages {
  date: string;
  messageCount: number;
}

export async function generateStats(outputPath: string): Promise<Stats> {
  const authors: AuthorValues[] = getAuthors();
  const messageTypes: string[] = getMessageTypes();
  const messagesPerDate: MessagesPerDate = getMessagesPerDay();
  const dates: string[] = Object.keys(messagesPerDate).sort();
  const stats: Stats = {
    authors,
    messageTypes,
    dates,
    messagesPerDate
  };
  await outputToFile(stats, outputPath);
  return stats;
}

function getAuthors(): AuthorValues[] {
  return Object.values(Chat.instance.authors).map<AuthorValues>(author => ({
    id: author.id,
    name: author.name
  }));
}

function getMessageTypes(): string[] {
  return Object.values(MessageType).map<string>(type => type);
}

function getMessagesPerDay(): MessagesPerDate {
  const messagesPerDate: MessagesPerDate = {};
  Chat.instance.messages.forEach((message: Message) => {
    const dateSql: string = dateToSql(message.dateTime);
    if (!(dateSql in messagesPerDate)) {
      messagesPerDate[dateSql] = {
        date: dateSql,
        messageCount: 0
      };
    }
    messagesPerDate[dateSql].messageCount += 1;
  });
  return messagesPerDate;
}
