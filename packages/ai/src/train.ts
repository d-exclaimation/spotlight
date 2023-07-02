import { writeFile } from "node:fs/promises";
import { create, preset, save } from "./brain.js";
import { Category } from "./category.js";
import { consola } from "./log.js";
import { collect } from "./source.js";

const classifier = await create();

consola.start("Training with preset data...");
preset(classifier);
consola.success("Training complete!");

const additions = new Set<string>();

let page = 1;

consola.start("Training with live data...");

while (true) {
  const { news } = await collect({ sort: "newest", page });

  for (const item of news) {
    const title = item.title.toLowerCase();

    consola.info(`\n-------------------------------\n`);
    consola.start(`${title}`);

    const res = await consola.prompt(`Category?`, {
      type: "select",
      initial: Category.enum.uncategorized,
      options: [...Object.keys(Category.enum), ...[...additions], "custom"],
    });

    const category = `${res}`;

    if (!category.includes("custom")) {
      classifier.addDocument(title, category);
      consola.success(`Classified with ${category}`);
      continue;
    }

    const custom = await consola.prompt(`New category?`, {
      type: "text",
    });

    additions.add(custom);
    classifier.addDocument(title, custom);
    consola.success(`Classified with ${custom}`);
  }

  const going = await consola.prompt(`Continue?`, {
    type: "confirm",
    initial: false,
  });

  if (!going) {
    break;
  }
  page++;
}

consola.start("Training...");
classifier.train();
consola.success("Training complete!");

consola.start("Refining categories...");

const categories = [...Object.keys(Category.enum), ...[...additions]]
  .map((category) => `  ${category}: "${category}",`)
  .join("\n");

const code = `import { z } from "zod";
/**
 * The category of the news.
 */
export type Category = z.infer<typeof Category>;
export const Category = z.nativeEnum({
${categories}
} as const);
`;
await writeFile("./src/category.ts", code);
consola.success("Refined!");

consola.start("Saving...");
await save(classifier);
consola.success("Saved!");
