import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createHbsFiles(e) {
  const dir = path.join(__dirname, "views", "components", "quick_links");

  fs.mkdirSync(dir, { recursive: true });

  e.forEach((name) => {
    fs.writeFileSync(path.join(dir, `${name}.hbs`), "");
  });
}

createHbsFiles(["link1", "link2", "link3"]);
