import { outputToFile } from "../utils/files.ts";
import { Message } from "../models/message.ts";
import { Author } from "../models/author.ts";
import { Chat } from "../models/chat.ts";

interface Stats {
  authors: Author[];
  messages: Message[];
}

export async function generateStats(outputPath: string): Promise<void> {
  const stats: Stats = {
    authors: Object.values(Chat.instance.authors),
    messages: Chat.instance.messages
  };
  return outputToFile(stats, outputPath);
}
