import { Message } from "../models/message.ts";
import { Chat } from "../models/chat.ts";
import { parseLine, ParseResult, ParseResultType } from "./lineParser.ts";

export async function parseChatFiles(chatFiles: string[]): Promise<void> {
  const chat: string = await readChatFiles(chatFiles);
  for await (const message of parseChat(chat)) {
    Chat.instance.addMessage(message);
  }
}

function* parseChat(chat: string): Generator<Message> {
  const lines: string[] = chat.split("\n");
  let lastMessage: Message | null = null;
  for (const line of lines) {
    const { type, message }: ParseResult = parseLine(line, lastMessage);
    switch (type) {
      case ParseResultType.Message:
        if (message) {
          yield message;
        }
        break;
      case ParseResultType.Empty:
        break;
      case ParseResultType.Continuation:
        break;
      case ParseResultType.Unknown:
        break;
      default:
        break;
    }
    if (message) {
      lastMessage = message;
    }
  }
}

async function readChatFiles(chatFiles: string[]): Promise<string> {
  let chat: string = "";
  for (const chatFile of chatFiles) {
    chat += await Deno.readTextFile(chatFile);
  }
  return chat;
}
