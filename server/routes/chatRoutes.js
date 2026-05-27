import express from "express";

import dotenv from "dotenv";

import Groq from "groq-sdk";

import { getPdfText } from "../pdfStore.js";

dotenv.config();

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    const pdfContext = getPdfText();

if (!pdfContext) {

  return res.json({
    reply: "Please upload a PDF first.",
  });
}

    const finalPrompt = `
You are an AI study assistant.

Use the following PDF content to answer the user's question.

PDF CONTENT:
${pdfContext}

USER QUESTION:
${message}
`;

    const completion =
      await groq.chat.completions.create({

        messages: [
          {
            role: "user",
            content: finalPrompt,
          },
        ],

        model: "llama-3.3-70b-versatile",
      });

    const reply =
      completion.choices[0]?.message?.content ||
      "No response";

    res.json({
      reply,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

export default router;