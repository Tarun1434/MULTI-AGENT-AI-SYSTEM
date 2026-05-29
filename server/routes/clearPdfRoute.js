import express from "express";
import { clearPdfData } from "../chunkStore.js";

const router = express.Router();

router.post("/", (req, res) => {

  console.log("🔥 PDF CLEARED 🔥");

  clearPdfData();

  console.log("Chunks:", getChunks()?.length);

  res.json({
    success: true,
    message: "PDF memory cleared",
  });

});
router.get("/", (req, res) => {

  console.log("🔥 PDF CLEARED VIA GET 🔥");

  res.send("CLEAR ROUTE WORKING");
});

export default router;