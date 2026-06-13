import { WebSocketServer } from "ws";

export const ws_connect = (/* web_socket */) => {
  /*   const server = new WebSocketServer({ port: 8101 }) */ //NORMAL
  /* const server = new WebSocketServer({ server: web_socket, path: "/ws" });  */ //APP+ WEBSOCKET
  const server = new WebSocketServer({ port: 8300 }); //REGISTED NORMAL SERVICE
  const clients = new Set();

  server.on("connection", (ws) => {
    clients.add(ws);
    console.log("connected: " + clients.size);

    ws.on("error", (err) => {
      console.log("Client error:", err.message);
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log("closed: " + clients.size);
    });

    ws.send(JSON.stringify({ ws_connect_running: true, msg: "active" }));
  });

  server.on("error", (err) => {
    console.log("CRITICAL SERVER ERROR:", err.message);
  });

  process.on("uncaughtException", (err) => {
    console.log("NODEJS EXCEPTION:", err.stack || err);
  });
};
