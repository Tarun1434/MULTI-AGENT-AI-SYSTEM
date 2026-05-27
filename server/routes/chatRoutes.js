import express from "express";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
     model: "llama-3.3-70b-versatile",
    });

    const reply =
      completion.choices[0]?.message?.content || "No response";

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