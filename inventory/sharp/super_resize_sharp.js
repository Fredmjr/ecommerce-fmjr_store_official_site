import sharp from "sharp";
import fs from "fs";
import path from "path";

const srcDir =
  "public/assets/imgs/ctgry/showroom/digital_art/seven_spirit_beasts";
const distDir =
  "public/dist/imgs/ctgry/showroom/digital_art/compressed_seven_spirit_beasts";

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}
fs.readdirSync(srcDir).forEach(async (file) => {
  if (/\.(jpe?g|png)$/i.test(file)) {
    const cleanName = path
      .parse(file)
      .name.trim()
      .replace(/[/\\?%*:|"<>]/g, "");
    const inputPath = path.join(srcDir, file);
    const outputPath = path.join(distDir, `${cleanName}.webp`);

    try {
      await sharp(inputPath)
        .resize({ width: 55, withoutEnlargement: true })
        .webp({ quality: 35, effort: 6, smartSubsample: true })
        .toFile(outputPath);

      console.log(`${cleanName}.webp`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }
});
