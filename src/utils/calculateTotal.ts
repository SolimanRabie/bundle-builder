import type { SelectedItem } from "../types/product";

export function calculateSubtotal(items: SelectedItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function calculateCompareAtSubtotal(items: SelectedItem[]): number {
  return items.reduce((sum, item) => {
    const unit = item.product.compareAtPrice ?? item.product.price;
    return sum + unit * item.quantity;
  }, 0);
}

export function calculateSavings(items: SelectedItem[]): number {
  const savings = calculateCompareAtSubtotal(items) - calculateSubtotal(items);
  return Math.max(0, savings);
}

/** Flat rate for this prototype — free shipping, always. */
export function calculateShipping(_items: SelectedItem[]): number {
  return 0;
}

export function calculateTotal(items: SelectedItem[]): number {
  return calculateSubtotal(items) + calculateShipping(items);
}

export function calculateMonthlyFinancing(items: SelectedItem[], months = 12): number {
  return calculateTotal(items) / months;
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
