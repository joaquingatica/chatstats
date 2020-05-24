import * as path from "path/mod.ts";
import { paths } from "./paths.ts";

const configJson = await Deno.readTextFile(`${paths.root}/config.json`);

export interface Config {
  sourceFiles: string[];
  outputPath: string;
}

const configRead: Config = JSON.parse(configJson);

export const config: Config = {
  sourceFiles: configRead.sourceFiles.map(sourceFile =>
    path.resolve(paths.root, sourceFile)
  ),
  outputPath: path.resolve(paths.root, configRead.outputPath)
};
