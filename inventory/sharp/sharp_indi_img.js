import sharp from "sharp";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const sharp_webp_single_img = async (imageBuffer, distDir) => {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const fileName = `${uuidv4()}.webp`;
  const outputPath = path.join(distDir, fileName);

  /* await sharp(imageBuffer).webp({ quality: 20, effort: 6 }).toFile(outputPath); */ // low but normal
  await sharp(imageBuffer).webp({ quality: 7, effort: 6 }).toFile(outputPath); //very low
  const filepth = `${distDir}/${fileName}`;
  return filepth;
};
