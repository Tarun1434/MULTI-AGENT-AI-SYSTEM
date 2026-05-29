import express from "express";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse";

import { RecursiveCharacterTextSplitter }
from "@langchain/textsplitters";

import {
  setChunks,
  setVectorStore,
} from "../chunkStore.js";

import { createVectorStore }
from "../rag/vectorStore.js";

const router = express.Router();

const storage = multer.diskStorage({

  destination: function (
    req,
    file,
    cb
  ) {

    cb(null, "uploads/");
  },

  filename: function (
    req,
    file,
    cb
  ) {

    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },
});

const upload =
  multer({ storage });

router.post(
  "/",
  upload.single("pdf"),
  async (req, res) => {
console.log("NEW RAG ROUTE RUNNING");
    try {

      const pdfPath =
        req.file.path;

      const dataBuffer =
        fs.readFileSync(
          pdfPath
        );

      const pdfData =
        await pdfParse(
          dataBuffer
        );

      const text =
        pdfData.text;

      // =====================
      // LANGCHAIN CHUNKING
      // =====================

      const splitter =
        new RecursiveCharacterTextSplitter({
          chunkSize: 500,
          chunkOverlap: 100,
        });

      const docs =
        await splitter.createDocuments([
          text,
        ]);

      const textChunks =
        docs.map(
          (doc) =>
            doc.pageContent
        );

      // Save chunks
      setChunks(
        textChunks
      );

      console.log(
        "Chunks Stored:",
        textChunks.length
      );


      // =====================
      // VECTOR STORE
      // =====================

      const vectorStore =
        await createVectorStore(
          textChunks
        );

      setVectorStore(
        vectorStore
      );

      console.log(
        "Vector Store Ready"
      );

      res.json({
        success: true,
        message:
          "RAG_TEST_999",
        chunks:
          textChunks.length,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        error:
          "PDF processing failed",
      });
    }

    console.log("RAG Upload Route Running...");
  }
);

export default router;