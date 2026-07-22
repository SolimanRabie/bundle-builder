import { formatCurrency } from "../../utils/calculateTotal";

interface PriceProps {
  price: number;
  compareAtPrice?: number | null;
  suffix?: string;
  size?: "md" | "lg";
}

export default function Price({ price, compareAtPrice, suffix = "", size = "md" }: PriceProps) {
  const hasDiscount = typeof compareAtPrice === "number" && compareAtPrice > price;

  return (
    <span className={`price-display price-display--${size}`}>
      {hasDiscount && (
        <span className="price price--compare">{formatCurrency(compareAtPrice as number)}</span>
      )}
      <span className="price price--active">
        {price === 0 ? "Free" : formatCurrency(price)}
        {suffix && <span className="price__suffix">{suffix}</span>}
      </span>
    </span>
  );
}
