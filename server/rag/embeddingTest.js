import { pipeline } from "@xenova/transformers";

console.log("Loading model...");

const extractor = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

console.log("Model loaded!");

const output = await extractor(
  "Java is an object oriented programming language.",
  {
    pooling: "mean",
    normalize: true,
  }
);

console.log(output.data.slice(0, 10));