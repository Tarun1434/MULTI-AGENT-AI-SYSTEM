import express from "express";
import { clearPdfData } from "../chunkStore.js";

const router = express.Router();

router.post("/", (req, res) => {

  try {

    console.log("🔥 PDF CLEARED 🔥");

    clearPdfData();

    res.json({
      success: true,
      message: "PDF memory cleared",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }

});

router.get("/", (req, res) => {

  res.send("CLEAR ROUTE WORKING");

});

export default router;
