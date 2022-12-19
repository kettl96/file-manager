import * as fsPromise from "fs/promises";

export const ls = async () => {
  const files = [];
  const directory = [];
  for (let item of await fsPromise.readdir(process.cwd(), {
    withFileTypes: true,
  })) {
    if (item.isFile()) files.push({ name: item.name, type: "file" });
    if (item.isDirectory()) directory.push({ name: item.name, type: "directory" });
  }
  return [files, directory];
};
