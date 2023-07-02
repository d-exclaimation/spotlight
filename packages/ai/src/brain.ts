import type { LogisticRegressionClassifier } from "natural";
import natural from "natural";
import { readFile, writeFile } from "node:fs/promises";
import { Category } from "./category.js";

export function preset(classifier: LogisticRegressionClassifier) {
  classifier.addDocument(
    [
      "ai",
      "artificial",
      "intelligence",
      "chatgpt",
      "gpt",
      "gpt-3",
      "gpt3",
      "openai",
      "gpt-4",
      "gpt4",
      "llm",
    ],
    Category.enum.ai
  );

  classifier.addDocument(
    [
      "tech",
      "technology",
      "postgres",
      "node.js",
      "javascript",
      "typescript",
      "react",
      "vue",
      "svelte",
      "angular",
      "python",
      "rust",
      "go",
      "golang",
      "java",
      "c",
      "c++",
      "c#",
      "php",
      "ruby",
      "elixir",
      "kotlin",
      "swift",
      "dart",
      "flutter",
      "android",
    ],
    Category.enum.tech
  );

  classifier.addDocument(
    [
      "politic",
      "politics",
      "president",
      "election",
      "trump",
      "biden",
      "democrat",
      "republican",
      "senate",
      "congress",
      "conservative",
      "liberal",
      "leftist",
      "rightist",
      "woke",
      "wokeism",
      "wokeist",
    ],
    Category.enum.politic
  );
}

export async function create() {
  try {
    const raw = await readFile("./out/brain.json", "utf-8");
    const classifier = natural.LogisticRegressionClassifier.restore(
      JSON.parse(raw)
    );
    return classifier;
  } catch (error) {
    return new natural.LogisticRegressionClassifier();
  }
}

export async function save(classifier: LogisticRegressionClassifier) {
  const serialized = JSON.stringify(classifier);
  const timestamp = new Date().toISOString();

  await writeFile(`./out/history/brain-${timestamp}.json`, serialized);
  await writeFile("./out/brain.json", serialized);
}