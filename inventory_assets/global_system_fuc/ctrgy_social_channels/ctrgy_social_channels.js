import { Innertube, Platform } from "youtubei.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "ctrgy_social_channels.jsonl");

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
//1. get youtube vides details
const full_url =
  "https://www.youtube.com/watch?v=wH30FV3RoY8&list=PLswh4Rt-GXgJsRDir76ddw47m_GHbJrgn&index=28";
const semi_url = "PLswh4Rt-GXgJsRDir76ddw47m_GHbJrgn";

export const ytchnnlata_fuc = async (arg_url) => {
  Platform.shim.eval = async (data) => new Function(data.output)();

  const yt = await Innertube.create();
  const playlist = await yt.getPlaylist(arg_url);

  const videos = playlist.items.map((item) => {
    const duration =
      item.duration?.text ||
      item.content_image?.overlays?.find((o) => o.badges)?.badges?.[0]?.text ||
      null;

    return {
      id: item.id || item.content_id,
      title: item.title?.text || item.metadata?.title?.text,
      duration,
      url: `https://youtu.be/${item.id || item.content_id}`,
    };
  });
  console.log(videos);
  return videos;
};
/* (async () => {
  ytchnnlata_fuc(semi_url)
    .then((data) => {
      console.log(data);
      //2. save to jsonl file
      const date = formattedDate;
      const time = formattedTime;
      try {
        const log_data = {
          service: "Youtube Channel Playlist Data API",
          time: time,
          date: date,
          data: data,
        };

        stream.write(JSON.stringify(log_data) + "\n");
        return { success: true, mgs: "Blog data saved!" };
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => console.error(err));
})();
 */
//3. get details & sort by durations - shorts & full vids
export const ytchnnlata_savetojsonlfilefuc = () => {
  //get array details
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const records = fileContent
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line));
  const yt_arr = records[0].data;
  console.log(yt_arr);
  //sort array into arrays
  if (yt_arr) {
    const getSeconds = (duration) => {
      const parts = duration.split(":").map(Number);
      return parts.length === 3
        ? parts[0] * 3600 + parts[1] * 60 + parts[2]
        : parts[0] * 60 + parts[1];
    };
    const full_vids = yt_arr.filter((item) => getSeconds(item.duration) > 120);
    const shorts_vids = yt_arr.filter(
      (item) => getSeconds(item.duration) <= 120,
    );

    /*     console.log(shorts_vids);
    console.log(full_vids) */ return {
      yt_data_length: yt_arr.length,
      shorts_vids: shorts_vids,
      full_vids: full_vids,
    };
  } else {
    console.log("Error failed to retrive youtube data array");
  }
};
ytchnnlata_savetojsonlfilefuc();
