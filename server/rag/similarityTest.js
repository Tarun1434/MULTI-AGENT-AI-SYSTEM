import { pipeline } from "@xenova/transformers";

const extractor = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

async function embed(text) {
  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}

function cosineSimilarity(a, b) {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

const docs = [
  "Java supports inheritance",
  "Python is easy to learn",
  "RAG stands for Retrieval Augmented Generation",
];

const query = "What is RAG?";

const queryEmbedding =
  await embed(query);

for (const doc of docs) {

  const docEmbedding =
    await embed(doc);

  const score =
    cosineSimilarity(
      queryEmbedding,
      docEmbedding
    );

  console.log(
    score.toFixed(4),
    "=>",
    doc
  );
}