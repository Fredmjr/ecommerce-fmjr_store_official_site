// corsMiddleware.js
import cors from "cors";

const corsMiddleware = cors({
  origin: "http://localhost:8100",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

export default corsMiddleware;
