import { create } from "./brain.js";
import { consola } from "./log.js";
import { collect } from "./source.js";

const classifier = await create();

consola.start("Training with existing data...");
classifier.train();
consola.success("Training complete!");

const debug = await consola.prompt("Debug mode?", {
  type: "confirm",
  initial: false,
});

let page = 1;

while (true) {
  const { news } = await collect({ sort: "newest", page });

  for (const item of news) {
    const title = item.title.toLowerCase();

    consola.info(`\n-------------------------------\n`);
    consola.start(`${title}`);

    if (debug) {
      const classifications = classifier.getClassifications(title);
      const [head, ...tail] = classifications.sort((a, b) => b.value - a.value);
      consola.success(`${head.label}: ${head.value.toFixed(3)} (likely)`);
      for (const { label, value } of tail) {
        consola.info(`${label}: ${value.toFixed(3)}`);
      }
    } else {
      const category = classifier.classify(title);
      consola.success(`Classified as ${category}`);
    }

    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
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
