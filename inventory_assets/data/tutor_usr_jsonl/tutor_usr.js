import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "tutor_usr.jsonl");

const now = new Date();

const formattedDate = now.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const formattedTime = now
  .toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
  .toLowerCase();

const stream = fs.createWriteStream(filePath, { flags: "a" });

//write to file
export const ttr_usr_saveJsonlfile_fuc = (obj, id) => {
  const date = formattedDate;
  const time = formattedTime;
  try {
    const log_data = {
      id: id,
      data: obj,
      time: time,
      date: date,
    };

    stream.write(JSON.stringify(log_data) + "\n");
    return { success: true };
  } catch (err) {
    console.log(err);
  }
};

//retrive from file
export const ttr_usr_loadJsonlfile_fuc = () => {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const records = fileContent
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line));

  return records;
};
