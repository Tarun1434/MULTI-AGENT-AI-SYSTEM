import { pipeline } from "@xenova/transformers";

let extractor = null;

export async function getEmbeddingModel() {

  if (!extractor) {

    console.log(
      "Loading embedding model..."
    );

    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );

    console.log(
      "Embedding model loaded!"
    );
  }

  return extractor;
}