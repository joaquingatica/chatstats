import { outputToFile } from "../utils/files.ts";
import { Chat, systemAuthor } from "../models/chat.ts";
import { Message, MessageType } from "../models/message.ts";
import { dateToSql } from "../utils/dateTimes.ts";
import { config } from "../config.ts";

export interface Stats {
  authors: AuthorValues[];
  messageTypes: string[];
  dates: string[];
  events: Events;
  messagesPerDate: MessagesPerDate;
}

interface AuthorValues {
  id: number;
  name: string;
}

type Events = Record<string, string>;

type MessagesPerDate = Record<string, DateMessages>;

interface DateMessages {
  date: string;
  messageCount: number;
  messagesPerAuthor: MessagesPerAuthor;
}

type MessagesPerAuthor = Record<string, number>;

export async function generateStats(outputPath: string): Promise<Stats> {
  const authors: AuthorValues[] = getAuthors();
  const messageTypes: string[] = getMessageTypes();
  const events: Events = await getEvents();
  const messagesPerDate: MessagesPerDate = getMessagesPerDay();
  const dates: string[] = Object.keys(messagesPerDate).sort();
  const stats: Stats = {
    authors,
    messageTypes,
    dates,
    events,
    messagesPerDate
  };
  await outputToFile(stats, outputPath);
  return stats;
}

function getAuthors(): AuthorValues[] {
  return Object.values(Chat.instance.authors)
    .map<AuthorValues>(author => ({
      id: author.id,
      name: author.name
    }))
    .filter(author => author.id !== systemAuthor.id);
}

function getMessageTypes(): string[] {
  return Object.values(MessageType).map<string>(type => type);
}

async function getEvents(): Promise<Events> {
  const { eventsSource } = config;
  if (eventsSource) {
    try {
      const eventsJson = await Deno.readTextFile(eventsSource);
      const eventsConfig = JSON.parse(eventsJson) as { events: Events };
      if (eventsConfig && eventsConfig.events) {
        return eventsConfig.events;
      }
    } catch (error) {
      // ignore error
      console.warn(error);
    }
  }
  return {};
}

function getMessagesPerDay(): MessagesPerDate {
  const messagesPerDate: MessagesPerDate = {};
  Chat.instance.messages.forEach((message: Message) => {
    if (message.author.id === systemAuthor.id) {
      return;
    }
    const dateSql: string = dateToSql(message.dateTime);
    if (!(dateSql in messagesPerDate)) {
      messagesPerDate[dateSql] = {
        date: dateSql,
        messageCount: 0,
        messagesPerAuthor: {}
      };
    }
    const authorIdStr = `${message.author.id}`;
    if (!(authorIdStr in messagesPerDate[dateSql].messagesPerAuthor)) {
      messagesPerDate[dateSql].messagesPerAuthor[authorIdStr] = 0;
    }
    messagesPerDate[dateSql].messageCount += 1;
    messagesPerDate[dateSql].messagesPerAuthor[authorIdStr] += 1;
  });
  return messagesPerDate;
}
