import { MemoryVectorStore }
from "langchain/vectorstores/memory";

import { getEmbeddingModel }
from "./embeddings.js";

export async function createVectorStore(
  chunks
) {

  const extractor =
    await getEmbeddingModel();

  const embeddings = {

    async embedQuery(text) {

      const output =
        await extractor(text, {
          pooling: "mean",
          normalize: true,
        });

      return Array.from(
        output.data
      );
    },

    async embedDocuments(texts) {

      return Promise.all(
        texts.map((text) =>
          this.embedQuery(text)
        )
      );
    },
  };

  return await MemoryVectorStore.fromTexts(
    chunks,
    chunks.map(() => ({})),
    embeddings
  );
}