import fs from "fs";
import path, { resolve } from "path";
import { checkExist } from "../helpers/checkExist.js";
import zlib from "zlib";
import { pipeline } from "node:stream/promises";

export const decompress = async (args) => {
  try {
    const filePath = resolve(args[0]);
    const file = path.basename(filePath).replace(".br", "");
    const destPath = resolve(args[1], file);
    const isFile = await checkExist(filePath);
    if (!isFile || !path.basename(filePath).includes(".br")) {
      console.log("There is no file in directory!");
      return;
    }
    const readStream = fs.createReadStream(filePath, { flags: "r" });
    const writeStream = fs.createWriteStream(destPath, { flags: "w" });
    const bd = zlib.createBrotliDecompress();
    await pipeline(readStream, bd, writeStream);
  } catch (error) {
    console.log("Operation failed!");
  }
};