import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import productsData from "../data/products.json";
import type { BundleState, Product, ProductsData, Step } from "../types/product";
import { bundleReducer } from "./reducer";
import { buildSeedState } from "../utils/seedState";
import { flattenProducts } from "../utils/getSelectedItems";
import { useLocalStorage } from "../hooks/useLocalStorage";

const typedProductsData = productsData as ProductsData;
const steps: Step[] = typedProductsData.steps;
const productsById: Record<string, Product> = flattenProducts(steps);

interface BundleContextValue {
  state: BundleState;
  steps: Step[];
  productsById: Record<string, Product>;
  saveNotice: string | null;
}

interface BundleActions {
  setVariant: (productId: string, variantId: string) => void;
  increment: (productId: string, product: Product, variantId?: string) => void;
  decrement: (productId: string, product: Product, variantId?: string) => void;
  toggleStep: (stepId: string) => void;
  nextStep: (stepId: string) => void;
  saveForLater: () => void;
  clearSaved: () => void;
}

const BundleStateContext = createContext<BundleContextValue | null>(null);
const BundleDispatchContext = createContext<BundleActions | null>(null);

export function BundleProvider({ children }: { children: ReactNode }) {
  const { loadBundle, saveBundle, clearBundle } = useLocalStorage();

  const [state, dispatch] = useReducer(bundleReducer, undefined, (): BundleState => {
    const seed = buildSeedState(steps);
    const saved = loadBundle();
    if (saved) {
      return {
        quantities: { ...seed.quantities, ...saved.quantities },
        openStepId: saved.openStepId ?? seed.openStepId,
      };
    }
    return seed;
  });

  const [restoredFromSave] = useState(() => Boolean(loadBundle()));
  const [saveNotice, setSaveNotice] = useState<string | null>(
    restoredFromSave ? "Restored your saved system." : null
  );

  useEffect(() => {
    if (!saveNotice) return;
    const timer = setTimeout(() => setSaveNotice(null), 3200);
    return () => clearTimeout(timer);
  }, [saveNotice]);

  const actions = useMemo<BundleActions>(
    () => ({
      setVariant: (productId, variantId) =>
        dispatch({ type: "SET_VARIANT", productId, variantId }),
      increment: (productId, product, variantId) =>
        dispatch({ type: "INCREMENT", productId, product, variantId }),
      decrement: (productId, product, variantId) =>
        dispatch({ type: "DECREMENT", productId, product, variantId }),
      toggleStep: (stepId) => dispatch({ type: "TOGGLE_STEP", stepId }),
      nextStep: (stepId) => dispatch({ type: "NEXT_STEP", stepId }),
      saveForLater: () => {
        saveBundle(state);
        setSaveNotice("Your system is saved. Come back anytime.");
      },
      clearSaved: () => {
        clearBundle();
        setSaveNotice("Cleared your saved system.");
      },
    }),
    [state, saveBundle, clearBundle]
  );

  const value = useMemo<BundleContextValue>(
    () => ({ state, steps, productsById, saveNotice }),
    [state, saveNotice]
  );

  return (
    <BundleStateContext.Provider value={value}>
      <BundleDispatchContext.Provider value={actions}>
        {children}
      </BundleDispatchContext.Provider>
    </BundleStateContext.Provider>
  );
}

export function useBundleState(): BundleContextValue {
  const ctx = useContext(BundleStateContext);
  if (!ctx) throw new Error("useBundleState must be used within a BundleProvider");
  return ctx;
}

export function useBundleActions(): BundleActions {
  const ctx = useContext(BundleDispatchContext);
  if (!ctx) throw new Error("useBundleActions must be used within a BundleProvider");
  return ctx;
}
