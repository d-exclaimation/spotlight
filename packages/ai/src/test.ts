import { create } from "./brain.js";
import { consola } from "./log.js";

const classifier = await create();

consola.start("Training with existing data...");
classifier.train();
consola.success("Training complete!");

const debug = await consola.prompt("Debug mode?", {
  type: "confirm",
  initial: false,
});

while (true) {
  const title = await consola.prompt("Title?", {
    type: "text",
  });
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
}
