import { memo, useCallback } from "react";
import type { Product, ProductState } from "../../types/product";
import { useBundleActions } from "../../context/BundleContext";
import { getActiveQuantity, getProductQuantity } from "../../utils/getSelectedItems";
import VariantSelector from "../VariantSelector/VariantSelector";
import QuantityStepper from "../QuantityStepper/QuantityStepper";
import Price from "../Price/Price";

interface ProductCardProps {
  product: Product;
  productState: ProductState | undefined;
}

function ProductCard({ product, productState }: ProductCardProps) {
  const { setVariant, increment, decrement } = useBundleActions();

  const hasVariants = Boolean(product.variants && product.variants.length > 0);
  const activeVariantId =
    (hasVariants && productState?.selectedVariant) || product.variants?.[0]?.id || "";

  const activeQuantity = getActiveQuantity(productState);
  const totalQuantity = getProductQuantity(productState);
  const selected = totalQuantity > 0;

  const min = product.minQuantity ?? 0;
  const max = product.maxQuantity;

  const handleSelectVariant = useCallback(
    (variantId: string) => setVariant(product.id, variantId),
    [setVariant, product.id]
  );
  const handleIncrease = useCallback(
    () => increment(product.id, product),
    [increment, product]
  );
  const handleDecrease = useCallback(
    () => decrement(product.id, product),
    [decrement, product]
  );

  return (
    <div className={"product-card" + (selected ? " product-card--selected" : "")}>
      {product.badge && <span className="product-card__badge">{product.badge}</span>}

      <div className="product-card__media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        {product.learnMoreUrl && (
          <a className="product-card__link" href={product.learnMoreUrl}>
            Learn more
          </a>
        )}

        {hasVariants && product.variants && (
          <VariantSelector
            variants={product.variants}
            activeVariantId={activeVariantId}
            onSelect={handleSelectVariant}
          />
        )}

        <div className="product-card__footer">
          <Price
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            suffix={product.priceSuffix}
          />

          <QuantityStepper
            value={activeQuantity}
            canDecrease={activeQuantity > min}
            canIncrease={typeof max !== "number" || activeQuantity < max}
            ariaLabel={`Quantity for ${product.name}${
              hasVariants ? " in " + activeVariantId : ""
            }`}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
