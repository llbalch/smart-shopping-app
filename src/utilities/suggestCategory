import { keywordCategoryMap } from "../constants/keywordCategoryMap"

export function suggestCategory(itemName) {
  const name = itemName.toLowerCase();
  for (const entry of keywordCategoryMap) {
    if (entry.keywords.some((keyword) => name.includes(keyword))) {
      return entry.category;
    }
  }
  return "Other";
}