import { config } from "./config.ts";
import { parseChatFiles } from "./parsers/chatParser.ts";
import { generateStats } from "./stats/stats.ts";
import { runServer } from "./server/server.ts";

await parseChatFiles(config.sourceFiles);
const stats = await generateStats(config.outputPath);
await runServer(stats);
