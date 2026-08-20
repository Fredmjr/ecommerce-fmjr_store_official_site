import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import imgModel from "../models/img.model.js";
import sequelize from "../config/db.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPortfolioImages() {
  const dirPath = path.join(__dirname, `../public/dist/imgs/ctgry/portfolio`);
  return fs.readdirSync(dirPath);
}

const images = getPortfolioImages();

for (const e of images) {
  await sequelize.sync();
  const result = await imgModel.create({
    site_sec: "ctgry",
    site_sub_sec: "portfolio",
    site_sub_sec_group: "graphics_design",
    img_filepath: `public/dist/imgs/ctgry/portfolio/${e}`,
    img_likes: "0",
  });

  if (result) {
  }
  console.log("hi", `public/dist/imgs/ctgry/portfolio/${e}`);
}
