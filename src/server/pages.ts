import { renderFileToString } from "dejs/mod.ts";
import { Stats } from "../stats/stats.ts";

type PageName = "index";

export function renderPage(pageName: PageName, stats: Stats): Promise<string> {
  return renderFileToString(`./pages/${pageName}.ejs`, { stats: stats });
}
