import * as path from "path/mod.ts";
import { paths } from "./paths.ts";

const configJson = await Deno.readTextFile(`${paths.root}/config.json`);

export interface Config {
  port: number;
  sourceFiles: string[];
  eventsSource: string;
  outputPath: string;
}

const defaultConfig: Config = {
  port: 8000,
  sourceFiles: [],
  eventsSource: "",
  outputPath: "./output/stats.json"
};

const configRead: Config = JSON.parse(configJson);

const config: Config = {
  ...defaultConfig,
  ...configRead
};

resolvePaths(config);

function resolvePaths(config: Config) {
  const { sourceFiles, eventsSource, outputPath } = config;
  config.sourceFiles = sourceFiles.map(sourceFile =>
    path.resolve(paths.root, sourceFile)
  );
  config.eventsSource = eventsSource
    ? path.resolve(paths.root, eventsSource)
    : "";
  config.outputPath = path.resolve(paths.root, outputPath);
}

export { config };
