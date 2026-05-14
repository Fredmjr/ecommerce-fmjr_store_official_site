import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import appRouter from "./routes/app.routes.js";
/*import apiRouter from "./routes/api.routes.js";
import userRouter from "./routes/user.routes.js"; */
import sequelize from "./config/db.js";

const app = express();
app.use(express.json());
const port = 8100;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(__filename);
app.set("view engine", "hbs");
app.set("/views", path.join(__dirname, "views", "components"));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.hbs");
});
app.use("/app", appRouter);
/*app.use("/api", apiRouter);
app.use("/usr", userRouter); */

(async () => {
  await sequelize.sync();
  app.listen(port, () => {
    console.log("Application running");
  });
})();
