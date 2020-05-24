import { serve } from "http/server.ts";
import { Stats } from "../stats/stats.ts";
import { renderPage } from "./pages.ts";

export async function runServer(stats: Stats): Promise<void> {
  const html = await renderPage("index", stats);
  for await (const request of serve({ port: 8000 })) {
    request.respond({ body: html });
  }
}
