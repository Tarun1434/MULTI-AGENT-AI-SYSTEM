let chunks = [];
let vectorStore = null;

export const setChunks = (newChunks) => {
  chunks = newChunks;
};

export const getChunks = () => {
  return chunks;
};

export const setVectorStore = (store) => {
  vectorStore = store;
};

export const getVectorStore = () => {
  return vectorStore;
};