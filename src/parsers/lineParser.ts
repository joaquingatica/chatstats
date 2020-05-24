/**
 * Line types:
 *  - Normal:         mm/dd/yy, hh:mm - Author Name: message contents
 *  - Media:          mm/dd/yy, hh:mm - Author Name: <Media omitted>
 *  - Notification:   mm/dd/yy, hh:mm - notification contents
 *  - Continuation:   message continuation content
 *
 *  Therefore:
 *    if (!hasTimestamp) {
 *      if (!previousMessage) {
 *        is unknown line
 *      } else {
 *        is continuation line
 *      }
 *    }
 *     if (!hasAuthor)
 *      is notification line
 *    }
 *    if (content == "<Media omitted>") {
 *      is media line
 *    }
 *    is normal line
 */
import { Chat } from "../models/chat.ts";
import { Message, MessageType } from "../models/message.ts";
import { Author } from "../models/author.ts";

export interface ParseResult {
  type: ParseResultType;
  line: string;
  message?: Message;
}

export enum ParseResultType {
  Empty,
  Unknown,
  Continuation,
  Message
}

const timestampRegex = /^(\d\d?\/\d\d?\/\d\d), (\d\d:\d\d) - (.*)$/i;
const authorRegex = /^([a-z0-9À-ÿ ]+): (.*)$/i;
const mediaMessage = "<Media omitted>";

export function parseLine(
  line: string,
  previousMessage: Message | null
): ParseResult {
  if (!line || !line.trim()) {
    return parseEmptyLine();
  }
  const timestampMatch = line.match(timestampRegex);
  if (!timestampMatch) {
    if (!previousMessage) {
      return parseUnknownLine(line);
    }
    return parseContinuationLine(line, previousMessage);
  }
  const [, dateStr, timeStr, authorAndMessage] = timestampMatch;
  const date: Date = parseTimestamp(dateStr, timeStr);
  const authorMatch = authorAndMessage.match(authorRegex);
  if (!authorMatch) {
    return parseNotificationLine(date, authorAndMessage);
  }
  const [, authorName, lineContents] = authorMatch;
  const author: Author = Chat.instance.addAuthorByName(authorName);
  if (lineContents.trim() === mediaMessage) {
    return parseMediaMessageLine(date, author);
  }
  return parseTextMessage(date, author, lineContents);
}

function parseEmptyLine(): ParseResult {
  return {
    type: ParseResultType.Empty,
    line: ""
  };
}

function parseUnknownLine(line: string): ParseResult {
  return {
    type: ParseResultType.Unknown,
    line
  };
}

function parseContinuationLine(
  line: string,
  previousMessage: Message
): ParseResult {
  previousMessage.content += line;
  return {
    type: ParseResultType.Continuation,
    line: line
  };
}

function parseNotificationLine(date: Date, notification: string): ParseResult {
  return {
    type: ParseResultType.Message,
    line: notification,
    message: new Message({
      dateTime: date,
      type: MessageType.Notification,
      content: notification,
      author: Chat.instance.getSystemAuthor()
    })
  };
}

function parseMediaMessageLine(date: Date, author: Author) {
  return {
    type: ParseResultType.Message,
    line: mediaMessage,
    message: new Message({
      dateTime: date,
      type: MessageType.Media,
      content: mediaMessage,
      author: author
    })
  };
}

function parseTextMessage(date: Date, author: Author, lineContents: any) {
  return {
    type: ParseResultType.Message,
    line: lineContents,
    message: new Message({
      dateTime: date,
      type: MessageType.Text,
      content: lineContents,
      author: author
    })
  };
}

function parseTimestamp(dateStr: string, timeStr: string): Date {
  const [monthStr, dayStr, yearStr] = dateStr.split("/");
  const [hourStr, minuteStr] = timeStr.split(":");
  return new Date(
    2000 + Number(yearStr),
    Number(monthStr) - 1,
    Number(dayStr),
    Number(hourStr),
    Number(minuteStr)
  );
}
