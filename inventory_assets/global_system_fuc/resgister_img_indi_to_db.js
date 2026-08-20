import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import img_indiModel from "../../models/img_indi.model.js";
import sequelize from "../../config/db.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function getPortfolioImages() {
  const dirPath = path.join(
    __dirname,
    `../../public/dist/imgs/ctgry/graphics_design/posters_flyers/thumbnail`,
  );
  return fs.readdirSync(dirPath);
}

const images = getPortfolioImages();

for (const e of images) {
  await sequelize.sync();
  const result = await img_indiModel.create({
    site_sec: "ctgry",
    site_sub_sec: "graphics_design",
    site_sub_sec_group: "posters_flyers",
    site_sub_sec_group_tag: "thumbnail",
    /* img_group_branding_nm */
    img_filepath: `public/dist/imgs/ctgry/graphics_design/posters_flyers/thumbnail/${e}`,
    img_likes: "0",
    likes: "0",
    share: "0",
  });

  if (result) {
  }
  console.log(
    "hi",
    `public/dist/imgs/ctgry/graphics_design/posters_flyers/thumbnail/${e}`,
  );
}
