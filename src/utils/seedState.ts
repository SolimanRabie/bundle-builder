import type { BundleState, ProductState, Step } from "../types/product";

export function buildSeedState(steps: Step[]): BundleState {
  const quantities: Record<string, ProductState> = {};

  steps.forEach((step) => {
    step.products.forEach((product) => {
      const seed = product.seedQuantities || {};

      if (product.variants && product.variants.length > 0) {
        const variants: Record<string, number> = {};
        product.variants.forEach((v) => {
          variants[v.id] = seed[v.id] || 0;
        });
        const firstWithQty = product.variants.find((v) => variants[v.id] > 0);
        quantities[product.id] = {
          variants,
          selectedVariant: firstWithQty ? firstWithQty.id : product.variants[0].id,
        };
      } else {
        quantities[product.id] = { quantity: seed.default || 0 };
      }
    });
  });

  return {
    quantities,
    openStepId: steps[0]?.id ?? null,
  };
}
