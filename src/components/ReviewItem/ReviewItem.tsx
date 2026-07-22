import { memo, useCallback } from "react";
import type { SelectedItem } from "../../types/product";
import { useBundleActions } from "../../context/BundleContext";
import QuantityStepper from "../QuantityStepper/QuantityStepper";
import { CATEGORY_ICONS } from "../icons";
import { formatCurrency } from "../../utils/calculateTotal";

interface ReviewItemProps {
  item: SelectedItem;
}

function ReviewItem({ item }: ReviewItemProps) {
  const { increment, decrement } = useBundleActions();
  const { product, variant, quantity } = item;

  const Icon = CATEGORY_ICONS[product.category];
  const lineTotal = product.price * quantity;
  const min = product.minQuantity ?? 0;
  const max = product.maxQuantity;

  const name = variant ? `${product.name} \u2014 ${variant.label}` : product.name;

  const handleIncrease = useCallback(
    () => increment(product.id, product, variant?.id),
    [increment, product, variant?.id]
  );
  const handleDecrease = useCallback(
    () => decrement(product.id, product, variant?.id),
    [decrement, product, variant?.id]
  );

  return (
    <div className="review-line">
      <span className="review-line__thumb">{Icon && <Icon />}</span>
      <div className="review-line__info">
        <span className="review-line__name">{name}</span>
      </div>
      <QuantityStepper
        size="sm"
        value={quantity}
        canDecrease={quantity > min}
        canIncrease={typeof max !== "number" || quantity < max}
        ariaLabel={`Quantity for ${name}`}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
      <span className="review-line__total">
        {lineTotal === 0 ? "Free" : formatCurrency(lineTotal)}
        {product.priceSuffix}
      </span>
    </div>
  );
}

export default memo(ReviewItem);
