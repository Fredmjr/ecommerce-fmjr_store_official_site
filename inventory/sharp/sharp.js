import sharp from "sharp";
import fs from "fs";
import path from "path";

const srcDir = "public/assets/imgs";
const distDir = "public/dist/imgs";

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.readdirSync(srcDir).forEach(async (file) => {
  if (/\.(jpe?g|png)$/i.test(file)) {
    const name = path.parse(file).name;

    const task = await sharp(path.join(srcDir, file))
      /* .webp({ quality: 80 , effort: 6 }) */ //normal
      .webp({ quality: 30, effort: 6 }) //intense
      .toFile(path.join(distDir, `${name}.webp`));
    if (task) {
      console.log(`${name}.webp`);
    }
  }
});
