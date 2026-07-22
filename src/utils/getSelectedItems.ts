import type { BundleState, Product, ProductState, SelectedItem, Step } from "../types/product";

/** Flat lookup of every product across every step, by id. */
export function flattenProducts(steps: Step[]): Record<string, Product> {
  const productsById: Record<string, Product> = {};
  steps.forEach((step) => {
    step.products.forEach((product) => {
      productsById[product.id] = { ...product, stepId: step.id };
    });
  });
  return productsById;
}

/** Total units of a product across every variant (or its plain quantity). */
export function getProductQuantity(productState: ProductState | undefined): number {
  if (!productState) return 0;
  if (productState.variants) {
    return Object.values(productState.variants).reduce((sum, n) => sum + (n || 0), 0);
  }
  return productState.quantity || 0;
}

/** The quantity the visible stepper on a card should show right now. */
export function getActiveQuantity(productState: ProductState | undefined): number {
  if (!productState) return 0;
  if (productState.variants) {
    const variantId = productState.selectedVariant;
    return (variantId && productState.variants[variantId]) || 0;
  }
  return productState.quantity || 0;
}

/** How many distinct products in a step have quantity > 0 — not total units. */
export function getStepSelectedCount(
  step: Step,
  quantities: BundleState["quantities"]
): number {
  return step.products.reduce((count, product) => {
    return getProductQuantity(quantities[product.id]) > 0 ? count + 1 : count;
  }, 0);
}

/**
 * Flattens all quantities > 0, across every step, into one list of
 * { product, variant, quantity } — the shape the review panel renders from.
 * No duplicate/derived data is stored anywhere; this is computed on demand.
 */
export function getSelectedItems(
  steps: Step[],
  quantities: BundleState["quantities"]
): SelectedItem[] {
  const items: SelectedItem[] = [];

  steps.forEach((step) => {
    step.products.forEach((product) => {
      const productState = quantities[product.id];
      if (!productState) return;

      if (product.variants && productState.variants) {
        product.variants.forEach((variant) => {
          const quantity = productState.variants?.[variant.id] || 0;
          if (quantity > 0) {
            items.push({ product, variant, quantity });
          }
        });
      } else {
        const quantity = productState.quantity || 0;
        if (quantity > 0) {
          items.push({ product, variant: null, quantity });
        }
      }
    });
  });

  return items;
}
