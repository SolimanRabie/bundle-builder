import { useCallback } from "react";
import { readJSON, writeJSON, removeKey } from "../utils/storage";
import type { BundleState, PersistedBundle } from "../types/product";

const STORAGE_KEY = "bundle-builder:saved-system";

/**
 * Wraps the raw localStorage helpers with the one shape this app cares about:
 * the bundle's quantities + which step was open. Saving is always explicit
 * (called from the "Save my system for later" link) — there's no autosave.
 */
export function useLocalStorage() {
  const loadBundle = useCallback((): PersistedBundle | null => {
    const saved = readJSON<PersistedBundle>(STORAGE_KEY);
    if (!saved || typeof saved !== "object" || !saved.quantities) return null;
    return saved;
  }, []);

  const saveBundle = useCallback((state: BundleState): PersistedBundle => {
    const payload: PersistedBundle = {
      quantities: state.quantities,
      openStepId: state.openStepId,
      savedAt: new Date().toISOString(),
    };
    writeJSON(STORAGE_KEY, payload);
    return payload;
  }, []);

  const clearBundle = useCallback(() => {
    removeKey(STORAGE_KEY);
  }, []);

  return { loadBundle, saveBundle, clearBundle };
}
