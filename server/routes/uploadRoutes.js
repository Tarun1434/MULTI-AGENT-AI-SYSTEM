import express from "express";

import multer from "multer";

import fs from "fs";

import pdfParse from "pdf-parse";

import { setPdfText } from "../pdfStore.js";

const router = express.Router();

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {

    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  upload.single("pdf"),
  async (req, res) => {

    try {

      const pdfPath = req.file.path;

      const dataBuffer = fs.readFileSync(pdfPath);

      const pdfData = await pdfParse(dataBuffer);

      

      const cleanedText = pdfData.text.trim();

setPdfText(cleanedText);

console.log(cleanedText.slice(0, 500));

      console.log("PDF Stored Successfully");

      res.json({
        message: "PDF uploaded successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: "PDF processing failed",
      });
    }
  }
);

export default router;