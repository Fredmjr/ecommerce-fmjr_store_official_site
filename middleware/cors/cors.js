// corsMiddleware.js
import cors from "cors";

const corsMiddleware = cors({
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

export default corsMiddleware;
