import { useMemo, useState } from "react";
import { useBundleState, useBundleActions } from "../../context/BundleContext";
import ReviewItem from "../ReviewItem/ReviewItem";
import Button from "../Button/Button";
import { CheckBadgeIcon, TruckIcon } from "../icons";
import { getSelectedItems } from "../../utils/getSelectedItems";
import { CATEGORY_ORDER, groupItemsByCategory } from "../../utils/groupItems";
import {
  calculateSubtotal,
  calculateCompareAtSubtotal,
  calculateSavings,
  calculateTotal,
  calculateMonthlyFinancing,
  formatCurrency,
} from "../../utils/calculateTotal";

export default function ReviewPanel() {
  const { state, steps, saveNotice } = useBundleState();
  const { saveForLater } = useBundleActions();
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  const selectedItems = useMemo(
    () => getSelectedItems(steps, state.quantities),
    [steps, state.quantities]
  );
  const groups = useMemo(() => groupItemsByCategory(selectedItems), [selectedItems]);

  const subtotal = calculateSubtotal(selectedItems);
  const compareAtSubtotal = calculateCompareAtSubtotal(selectedItems);
  const savings = calculateSavings(selectedItems);
  const total = calculateTotal(selectedItems);
  const monthlyFinancing = calculateMonthlyFinancing(selectedItems);

  const hasItems = selectedItems.length > 0;

  return (
    <aside className="review-panel">
      <h2 className="review-panel__title">Your security system</h2>
      <p className="review-panel__subtitle">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>

      {saveNotice && <div className="review-panel__toast">{saveNotice}</div>}

      {!hasItems && (
        <p className="review-panel__empty">
          Nothing selected yet. Add a camera to get started.
        </p>
      )}

      <div className="review-panel__groups">
        {CATEGORY_ORDER.map((category) => {
          const items = groups[category];
          if (!items || items.length === 0) return null;
          return (
            <div className="review-group" key={category}>
              <h3 className="review-group__heading">{category}</h3>
              {items.map((item) => (
                <ReviewItem
                  key={`${item.product.id}:${item.variant?.id ?? "default"}`}
                  item={item}
                />
              ))}
            </div>
          );
        })}
      </div>

      <div className="review-panel__guarantee">
        <span className="review-panel__seal">
          <CheckBadgeIcon />
          <span>100%</span>
        </span>
        <div>
          <p className="review-panel__guarantee-title">60-day hassle-free returns</p>
          <p className="review-panel__guarantee-copy">
            If you're not totally in love with the product, we'll refund you 100%.
          </p>
        </div>
      </div>

      <div className="review-panel__perk">
        <TruckIcon />
        <span>Fast Shipping</span>
        <span className="review-panel__perk-value">FREE</span>
      </div>

      <div className="review-panel__totals">
        <div className="review-panel__total-row">
          {total > 0 && (
            <span className="review-panel__financing">
              Or finance {formatCurrency(monthlyFinancing)}/mo
            </span>
          )}
          <span className="review-panel__total-amount">
            {savings > 0 && (
              <span className="price price--compare">
                {formatCurrency(compareAtSubtotal)}
              </span>
            )}
            <span className="price price--active">{formatCurrency(total)}</span>
          </span>
        </div>
        {savings > 0 && (
          <p className="review-panel__savings">
            Congrats! You're saving {formatCurrency(savings)} on your security
            bundle!
          </p>
        )}
      </div>

      <Button
        variant="solid"
        className="btn--checkout"
        onClick={() => setCheckoutMessage(true)}
        disabled={!hasItems}
      >
        Checkout
      </Button>
      {checkoutMessage && (
        <p className="review-panel__checkout-note">
          This is a prototype, checkout isn't wired up to anything yet.
        </p>
      )}

      <button type="button" className="review-panel__save-link" onClick={saveForLater}>
        Save my system for later
      </button>
    </aside>
  );
}
