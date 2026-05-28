import express from "express";

import dotenv from "dotenv";

import Groq from "groq-sdk";

import natural from "natural";

import { getChunks } from "../chunkStore.js";

dotenv.config();

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    const chunks = getChunks();

    let finalPrompt = "";

    // =========================================
    // IF PDF EXISTS
    // =========================================
    if (chunks.length) {

      // SIMILARITY SEARCH
      const scoredChunks = chunks.map((chunk) => {

        const score =
          natural.JaroWinklerDistance(
            message.toLowerCase(),
            chunk.toLowerCase()
          );

        return {
          chunk,
          score,
        };
      });

      // SORT BEST MATCHES
      scoredChunks.sort(
        (a, b) => b.score - a.score
      );

      // TOP 3 CHUNKS
      const topChunks = scoredChunks
        .slice(0, 3)
        .map((item) => item.chunk)
        .join("\n");

      // BEST SCORE
      const bestScore =
        scoredChunks[0].score;

      // =========================================
      // DOCUMENT CHAT MODE
      // =========================================
      if (bestScore > 0.75) {

        finalPrompt = `
You are an AI Study Assistant.

Answer using the document context.

DOCUMENT CONTEXT:
${topChunks}

QUESTION:
${message}
`;

      }

      // =========================================
      // NORMAL AI MODE
      // =========================================
      else {

        finalPrompt = `
You are a helpful AI assistant.

QUESTION:
${message}
`;
      }

    }

    // =========================================
    // NO PDF UPLOADED
    // =========================================
    else {

      finalPrompt = `
You are a helpful AI assistant.

QUESTION:
${message}
`;
    }

    // =========================================
    // STREAMING RESPONSE
    // =========================================
    const completion =
      await groq.chat.completions.create({

        messages: [
          {
            role: "user",
            content: finalPrompt,
          },
        ],

        model: "llama-3.3-70b-versatile",

        stream: true,
      });

    // RESPONSE HEADER
    res.setHeader(
      "Content-Type",
      "text/plain"
    );

    // STREAM TOKENS
    for await (const chunk of completion) {

      const content =
        chunk.choices[0]?.delta?.content || "";

      res.write(content);
    }

    // END RESPONSE
    res.end();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

export default router;