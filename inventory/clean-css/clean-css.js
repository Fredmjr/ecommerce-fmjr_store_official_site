import CleanCSS from "clean-css";
import fs from "fs";
import path from "path";

function minifyCss() {
  const inputDir = path.join("public", "src", "css");
  const outputDir = path.join("public", "dist", "css");
  const minifier = new CleanCSS();

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter((f) => f.endsWith(".css"));

  files.forEach((file) => {
    try {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      const input = fs.readFileSync(inputPath, "utf8");
      const output = minifier.minify(input);

      if (output.errors.length > 0) {
        console.log(`Fail: ${file}`);
        return;
      }

      fs.writeFileSync(outputPath, output.styles);
      console.log(`Success: ${file}`);
    } catch (err) {
      console.log(`Fail: ${file}`);
    }
  });
}

minifyCss();
