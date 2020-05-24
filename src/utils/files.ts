import * as path from "path/mod.ts";

export async function outputToFile<T>(
  data: T,
  outputPath: string,
  prettyPrint = true
): Promise<void> {
  const dataStr = prettyPrint
    ? JSON.stringify(data, null, 2)
    : JSON.stringify(data);
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(dataStr);
  await ensureFileDir(outputPath);
  await Deno.writeFile(outputPath, encodedData);
}

export async function ensureFileDir(filePath: string): Promise<void> {
  return ensureDir(path.dirname(filePath));
}

export async function ensureDir(dirPath: string): Promise<void> {
  const dirStat = await Deno.stat(dirPath);
  if (!dirStat.isDirectory) {
    const parentDir: string = path.dirname(dirPath);
    await ensureDir(parentDir);
    return Deno.mkdir(dirPath);
  }
}
