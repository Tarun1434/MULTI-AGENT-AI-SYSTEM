import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { pipeline } from "@xenova/transformers";

const extractor = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

const embeddings = {
  async embedQuery(text) {
    const output = await extractor(text, {
      pooling: "mean",
      normalize: true,
    });

    return Array.from(output.data);
  },

  async embedDocuments(texts) {
    return Promise.all(
      texts.map((text) =>
        this.embedQuery(text)
      )
    );
  },
};

const vectorStore =
  await MemoryVectorStore.fromTexts(
    [
      "Java supports inheritance.",
      "Python is easy to learn.",
      "RAG stands for Retrieval Augmented Generation.",
    ],
    [{}, {}, {}],
    embeddings
  );

const results =
  await vectorStore.similaritySearch(
    "What is RAG?",
    2
  );

console.log(results);