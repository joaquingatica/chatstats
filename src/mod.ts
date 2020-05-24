import { config } from "./config.ts";
import { parseChatFiles } from "./parsers/chatParser.ts";
import { generateStats } from "./stats/stats.ts";

await parseChatFiles(config.sourceFiles);
await generateStats(config.outputPath);
