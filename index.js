import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import appRouter from "./routes/app.routes.js";
/*import apiRouter from "./routes/api.routes.js";
import userRouter from "./routes/user.routes.js"; */
import sequelize from "./config/db.js";
import corsMiddleware from "./middleware/cors/cors.js";
import { ws_connect } from "./websockets/ws_connect.js";

const app = express();
app.use(express.json());
const port = 8300;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(__filename);
app.set("view engine", "hbs");
app.set("/views", path.join(__dirname, "views", "components"));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.hbs");
});
app.use("/app", corsMiddleware, appRouter);
/*app.use("/api", apiRouter);
app.use("/usr", userRouter); */

//NORMAL
/* 
(async () => {
  await sequelize.sync();
  ws_connect();
  app.listen(port, () => {
    console.log("Application running");
  });
})(); */

//APP + WEBSOCKET
(async () => {
  await sequelize.sync();
  //app
  const web_socket = app.listen(port, () => {
    console.log("Application running");
  });
  //websocket
  ws_connect(web_socket);
})();
