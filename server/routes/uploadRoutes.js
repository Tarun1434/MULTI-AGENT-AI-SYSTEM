import express from "express";

import multer from "multer";

import fs from "fs";

import pdfParse from "pdf-parse";

import { setChunks } from "../chunkStore.js";

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

      const text = pdfData.text;

      // CHUNKING
      const chunkSize = 500;

      let textChunks = [];

      for (let i = 0; i < text.length; i += chunkSize) {

        textChunks.push(
          text.slice(i, i + chunkSize)
        );
      }

      setChunks(textChunks);

      console.log("Chunks Stored:", textChunks.length);

      res.json({
        message: "PDF uploaded and chunked successfully",
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