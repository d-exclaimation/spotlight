import natural from "natural";

/**
 * Lazy loaded the pre-trained classifier model
 */
export const { default: model } = await import(
  "@spotlight/ai/model/classifier.json",
  {
    assert: { type: "json" },
  }
);

/**
 * The linear regression classifier instance
 */
export const classifier = natural.LogisticRegressionClassifier.restore(
  model as any
);
