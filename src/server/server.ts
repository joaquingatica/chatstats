import { serve } from "http/server.ts";
import { config } from "../config.ts";
import { Stats } from "../stats/stats.ts";
import { renderPage } from "./pages.ts";

export async function runServer(stats: Stats): Promise<void> {
  const html = await renderPage("index", stats);
  const serverListening = serve({ port: config.port });
  console.log(`Server listening on port ${config.port}.`);
  for await (const request of serverListening) {
    request.respond({ body: html });
  }
}
