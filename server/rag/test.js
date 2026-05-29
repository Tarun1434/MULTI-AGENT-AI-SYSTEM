import {
  RecursiveCharacterTextSplitter,
} from "@langchain/textsplitters";

const text = `
Java is a high-level programming language.
It supports OOP concepts like inheritance,
polymorphism, abstraction, and encapsulation.

RAG stands for Retrieval Augmented Generation.
It combines retrieval and generation.
`;

const splitter =
  new RecursiveCharacterTextSplitter({
    chunkSize: 50,
    chunkOverlap: 10,
  });

const docs =
  await splitter.createDocuments([text]);

console.log(docs);