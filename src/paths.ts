import { dirname, fromFileUrl } from "path/mod.ts";

interface Paths {
  root: string;
}

const currentDirname: string = dirname(fromFileUrl(import.meta.url));
const root: string = dirname(currentDirname);

export const paths: Paths = {
  root
};
