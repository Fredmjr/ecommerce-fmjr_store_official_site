import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import appRouter from "./routes/app.routes.js";
import apiRouter from "./routes/api.routes.js";
import store_managerRouter from "./routes/store_manager.routes.js";
import blogapiRouter from "./routes/blogapi.routes.js";
import userRouter from "./routes/user.routes.js";
import sequelize from "./config/db.js";
import corsMiddleware from "./middleware/cors/cors.js";
import { ws_connect } from "./websockets/ws_connect.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
const port = 8100;
/* const port = 8100; */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(__filename);
app.set("view engine", "hbs");
app.set("/views", path.join(__dirname, "views", "components", "quick_links"));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.hbs");
});

app.use("/app", corsMiddleware, appRouter);
app.use("/api", apiRouter);
app.use("/usr", userRouter);

//blog
app.get("/blog", (req, res) => {
  return res.status(200).render("components/quick_links/blog.hbs");
});
app.use("/blog", corsMiddleware, blogapiRouter);

//store managment
app.get("/store_manager", (req, res) => {
  return res
    .status(200)
    .render("components/store_managment/store_managment.hbs");
});
//store managment - routes
app.use("/apstore_manager", store_managerRouter);

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
  await sequelize.sync(); //dont detect missing columns
  /*  await sequelize.sync({ alter: true }); */ //detect missing columns
  //app
  const web_socket = app.listen(port, () => {
    console.log("Application running");
  });
  //websocket
  ws_connect(web_socket);
})();
