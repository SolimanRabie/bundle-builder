import { memo } from "react";
import type { Variant } from "../../types/product";

interface VariantSelectorProps {
  variants: Variant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
}

function VariantSelector({
  variants,
  activeVariantId,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="variant-selector" role="radiogroup" aria-label="Choose a color">
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          role="radio"
          aria-checked={variant.id === activeVariantId}
          className={
            "variant-chip" + (variant.id === activeVariantId ? " variant-chip--active" : "")
          }
          onClick={() => onSelect(variant.id)}
        >
          <span className="variant-chip__swatch" style={{ background: variant.swatch }} />
          <span className="variant-chip__label">{variant.label}</span>
        </button>
      ))}
    </div>
  );
}

export default memo(VariantSelector);
