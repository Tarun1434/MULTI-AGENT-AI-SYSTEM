import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chatRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import clearPdfRoute from "./routes/clearPdfRoute.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chatRoutes);

app.use("/upload", uploadRoutes);
app.use("/clear-pdf", clearPdfRoute);
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});