export interface Variant {
  id: string;
  label: string;
  swatch: string;
}

export interface Product {
  id: string;
  name: string;
  category: "Cameras" | "Sensors" | "Accessories" | "Plan";
  description: string;
  image: string;
  learnMoreUrl?: string | null;
  badge?: string | null;
  compareAtPrice?: number | null;
  price: number;
  priceSuffix?: string;
  variants?: Variant[] | null;
  /** Floor for the stepper — e.g. a required hub can't go below 1. */
  minQuantity?: number;
  /** Ceiling for the stepper — e.g. a plan can only ever be 0 or 1. */
  maxQuantity?: number;
  /** Initial quantities baked into the data, keyed by variant id, or "default". */
  seedQuantities: Record<string, number>;
  stepId?: string;
}

export interface Step {
  id: string;
  stepNumber: number;
  title: string;
  icon: "camera" | "plan" | "sensor" | "shield";
  products: Product[];
}

export interface ProductsData {
  steps: Step[];
}

/**
 * Per-product slice of state.
 * - Non-variant products use `quantity`.
 * - Variant products use `variants` (one count per variant id) plus
 *   `selectedVariant`, which decides which count the visible stepper edits.
 */
export interface ProductState {
  selectedVariant?: string;
  quantity?: number;
  variants?: Record<string, number>;
}

export interface BundleState {
  quantities: Record<string, ProductState>;
  openStepId: string | null;
}

export interface SelectedItem {
  product: Product;
  variant: Variant | null;
  quantity: number;
}

export interface PersistedBundle {
  quantities: Record<string, ProductState>;
  openStepId: string | null;
  savedAt: string;
}
