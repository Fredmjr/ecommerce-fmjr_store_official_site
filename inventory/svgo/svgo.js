import potrace from "potrace";
import fs from "fs";
import path from "path";
import { optimize } from "svgo";

const svgo_optimizeFuc = async () => {
  //normal
  const inputDir = path.join("public", "assets", "icons");
  const outputDir = path.join("public", "dist", "icons");

  //hshel icons
  /*   const inputDir = path.join("public", "assets", "icons", "hshels_icons");
  const outputDir = path.join("public", "dist", "hshels_icons"); */

  //normal
  /*   const inputDir = path.join("public", "assets", "logos");
  const outputDir = path.join("public", "dist", "logos");*/

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const traceOptions = {
    threshold: 128,
    turdSize: 15,
    optTolerance: 0.6,
  };

  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.endsWith(".png"));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(".png", ".svg"));

    try {
      const rawSvg = await new Promise((resolve, reject) => {
        potrace.trace(inputPath, traceOptions, (err, svg) => {
          if (err) return reject(err);
          resolve(svg);
        });
      });

      const optimized = optimize(rawSvg, {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                cleanupNumericValues: { floatPrecision: 1 },
              },
            },
          },
        ],
      });

      fs.writeFileSync(outputPath, optimized.data);
      console.log(`Success: ${file}`);
    } catch (err) {
      console.log(`Fail: ${file}`);
    }
  }
};

svgo_optimizeFuc();
