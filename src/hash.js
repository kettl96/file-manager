import crypto from "crypto";
import fs from "fs";

export const hash = async (args) => {
  const readStream = fs.createReadStream(args[0], {
    flags: "r",
    encoding: "utf8",
  });
  let data = "";
  return new Promise((resolve) => {
    readStream.on("data", (chunk) => data += chunk);
    readStream.on("end", () => {
      const createHash = crypto.createHash("sha256");
      createHash.update(data);
      const hex = createHash.digest("hex");
      resolve(`${hex}\n`);
    });
    readStream.on("error", (error) => resolve("Operation failed!\n"));
  });
};
