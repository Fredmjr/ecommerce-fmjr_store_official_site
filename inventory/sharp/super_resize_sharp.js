import sharp from "sharp";
import fs from "fs";
import path from "path";

const srcDir = "public/assets/imgs/promo_cards/web_dev_pricelist";
const distDir = "public/dist/imgs/promo_cards/web_dev_pricelist";

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
        .resize({ width: 95, withoutEnlargement: true })
        .webp({ quality: 100, effort: 6, smartSubsample: true })
        .toFile(outputPath);

      console.log(`${cleanName}.webp`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }
});
