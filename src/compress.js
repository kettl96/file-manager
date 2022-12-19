import zlib from "zlib";
import { resolve } from "path";
import fs from "fs";
import path from "path";
import { checkExist } from "./checkExist.js";
import { pipeline } from "node:stream/promises";

export const compress = async (args) => {
  const filePath = resolve(args[0]);
  const file = path.basename(filePath);
  const destPath = resolve(args[1], file);
  const isFile = await checkExist(filePath);
  if (!isFile) {
    console.log("There is no file in directory!");
    return;
  }
  try {
    const readStream = fs.createReadStream(filePath, {
      flags: "r",
      encoding: "utf8",
    });
    const writeStream = fs.createWriteStream(`${destPath}`, { flags: "wx" });
    const bc = zlib.createBrotliCompress();
    await pipeline(readStream, bc, writeStream);
  } catch (error) {
    console.log("Operation failed!");
  }
};
