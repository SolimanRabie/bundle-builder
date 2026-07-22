import type { SelectedItem } from "../types/product";

export const CATEGORY_ORDER = ["Cameras", "Sensors", "Accessories", "Plan"] as const;

export function groupItemsByCategory(
  items: SelectedItem[]
): Record<string, SelectedItem[]> {
  const groups: Record<string, SelectedItem[]> = {};

  items.forEach((item) => {
    const category = item.product.category;
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
  });

  return groups;
}
