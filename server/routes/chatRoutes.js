import express from "express";
import dotenv from "dotenv";
import Groq from "groq-sdk";

import { getVectorStore } from "../chunkStore.js";

dotenv.config();

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {
   console.log("🔥 CHAT ROUTE HIT 🔥");
  try {
    const { message } = req.body;

    let finalPrompt = "";

    // ============================
    // GET VECTOR STORE
    // ============================

    const vectorStore = getVectorStore();

    console.log(
      "VectorStore:",
      !!vectorStore
    );

    // ============================
    // PDF EXISTS
    // ============================

    if (vectorStore) {

      const results =
        await vectorStore.similaritySearch(
          message,
          15
        );

      const topChunks =
        results
          .map(
            (doc) =>
              doc.pageContent
          )
          .join("\n\n");

      finalPrompt = `
You are an AI Study Assistant.

Answer ONLY using the document context below.

DOCUMENT CONTEXT:
${topChunks}

QUESTION:
${message}

If the answer is not present in the document, say:
"The answer was not found in the uploaded PDF."
`;

    }

    // ============================
    // NORMAL CHAT MODE
    // ============================

    else {

      finalPrompt = `
You are a helpful AI assistant.

QUESTION:
${message}
`;
    }

    // ============================
    // GROQ STREAMING
    // ============================

    const completion =
      await groq.chat.completions.create({

        messages: [
          {
            role: "user",
            content: finalPrompt,
          },
        ],

        model:
          "openai/gpt-oss-120b",

        stream: true,
      });

    res.setHeader(
      "Content-Type",
      "text/plain"
    );

    for await (const chunk of completion) {

      const content =
        chunk.choices[0]?.delta
          ?.content || "";

      res.write(content);
    }

    res.end();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Something went wrong",
    });
  }
});

export default router;
