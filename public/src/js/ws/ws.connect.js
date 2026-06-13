const ws_connect = () => {
  //NORMAL
  /*   const socket = new WebSocket("ws://localhost:8101"); */
  //APP + WEBSOCKET
  const protocol = window.location.protocol === "https:" ? "wss://" : "ws://";
  const socket = new WebSocket(`${protocol}${window.location.host}`);

  //onfline
  socket.addEventListener("open", (message) => {
    console.log("ws_connect_online");
  });
  //message data
  socket.addEventListener("message", (event) => {
    const parsed_data = JSON.parse(event.data);

    if (parsed_data.ws_connect_running === true) {
      console.log("ws_connect_msg:", parsed_data.msg);
    }
  });
  //offline
  socket.addEventListener("close", (event) => {
    console.log("ws_connect_offline");
  });

  socket.addEventListener("error", (err) => {
    console.error("ws_connect_err:", err);
  });
};

ws_connect();
