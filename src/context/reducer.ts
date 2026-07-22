import type { BundleState, Product, ProductState } from "../types/product";

export type BundleAction =
  | { type: "SET_VARIANT"; productId: string; variantId: string }
  | { type: "INCREMENT"; productId: string; product: Product; variantId?: string }
  | { type: "DECREMENT"; productId: string; product: Product; variantId?: string }
  | { type: "TOGGLE_STEP"; stepId: string }
  | { type: "NEXT_STEP"; stepId: string }
  | { type: "LOAD_STATE"; state: Partial<BundleState> }
  | { type: "RESET"; state: BundleState };

function clamp(product: Product, quantity: number): number {
  const min = product.minQuantity ?? 0;
  const max = product.maxQuantity;
  const next = Math.max(min, quantity);
  return typeof max === "number" ? Math.min(max, next) : next;
}

function stepQuantity(
  productState: ProductState | undefined,
  product: Product,
  delta: 1 | -1,
  targetVariantId?: string
): ProductState {
  const current: ProductState = productState ?? (
    product.variants
      ? { variants: {}, selectedVariant: product.variants[0]?.id }
      : { quantity: 0 }
  );

  if (product.variants) {
    const variantId = targetVariantId ?? current.selectedVariant ?? product.variants[0]?.id;
    const variants = { ...current.variants };
    const currentQty = variants[variantId] || 0;
    variants[variantId] = clamp(product, currentQty + delta);
    return { ...current, variants };
  }

  const currentQty = current.quantity || 0;
  return { ...current, quantity: clamp(product, currentQty + delta) };
}

export function bundleReducer(state: BundleState, action: BundleAction): BundleState {
  switch (action.type) {
    case "SET_VARIANT": {
      const { productId, variantId } = action;
      const current = state.quantities[productId];
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [productId]: { ...current, selectedVariant: variantId },
        },
      };
    }

    case "INCREMENT": {
      const { productId, product, variantId } = action;
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [productId]: stepQuantity(state.quantities[productId], product, 1, variantId),
        },
      };
    }

    case "DECREMENT": {
      const { productId, product, variantId } = action;
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [productId]: stepQuantity(state.quantities[productId], product, -1, variantId),
        },
      };
    }

    case "TOGGLE_STEP": {
      const { stepId } = action;
      return {
        ...state,
        openStepId: state.openStepId === stepId ? null : stepId,
      };
    }

    case "NEXT_STEP": {
      return { ...state, openStepId: action.stepId };
    }

    case "LOAD_STATE": {
      return { ...state, ...action.state };
    }

    case "RESET": {
      return action.state;
    }

    default:
      return state;
  }
}
