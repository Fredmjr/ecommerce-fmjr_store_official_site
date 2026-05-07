import ttf2woff2 from "ttf2woff2";
import fs from "fs";
import path from "path";

const ttf2woff2Func = () => {
  const inputDir = path.join("public", "assets", "fonts", "reddit");
  const outputDir = path.join("public", "dist", "fonts", "reddit");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter((f) => f.endsWith(".ttf"));

  files.forEach((file) => {
    try {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file.replace(".ttf", ".woff2"));

      const input = fs.readFileSync(inputPath);
      const output = ttf2woff2(input);

      fs.writeFileSync(outputPath, output);
      console.log(`Success: ${file}`);
    } catch (err) {
      console.log(`Fail: ${file}`);
    }
  });
};

ttf2woff2Func();
