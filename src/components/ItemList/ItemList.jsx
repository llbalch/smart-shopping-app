//* Group Items by category, category headers, display each item with name and (quantity), show a pencil icon that opens edit details when clicked, allow toggling (complete/ incomplete)
// strikethrough on click for marking complete *//
import React from "react";
import editIcon from "../../assets/images/pencil.png";
import { DEFAULT_CATEGORIES } from "../../constants/categories";
import { CATEGORY_COLORS } from "../../constants/categoryColors";
import "../Modal/Modal.css";
import { suggestCategory } from "../../utilities/suggestCategory";
import trashIcon from "../../assets/images/trash.png";
// appending User-made custom categories to default categories
export function ItemList({
  items,
  onEditItem,
  onToggleComplete,
  onAddToList,
  onDeleteItem,
  showToggle = true,
  showPlus = false,
  showQuantity = true,
  showNote = true,
  showEdit = true,
  showDelete = false,
}) {
  const categoriesInUse = [...new Set(items.map((item) => item.category))];
  const customCategories = categoriesInUse.filter(
    (category) => !DEFAULT_CATEGORIES.includes(category)
  );
  const allCategories = [
    ...DEFAULT_CATEGORIES.filter((category) =>
      categoriesInUse.includes(category)
    ),
    ...customCategories,
  ];
  // Group items by category
  const grouped = items.reduce((acc, item) => {
    const category =
      item.category || suggestCategory(item.name) || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          {/* Category Header */}
          <div
            className="category-banner"
            style={{
              background: CATEGORY_COLORS[category] || "#eee",
            }}
          >
            {category}
          </div>
          {/* Items in Category */}
          {grouped[category].map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {/* Plus Button for Favorites */}
              {showPlus && (
                <button
                  onClick={() => onAddToList(item)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "0.5rem",
                    color: "#198754",
                    fontSize: "1.2em",
                    fontWeight: "bold",
                  }}
                  aria-label={`Add ${item.name} to shopping list`}
                >
                  +
                </button>
              )}

              {/* Item Name and Quantity */}
              <span
                onClick={
                  showToggle && onToggleComplete
                    ? () => onToggleComplete(item.id)
                    : undefined
                }
                style={{
                  flex: 1,
                  cursor: showToggle ? "pointer" : "default",
                  textDecoration:
                    showToggle && item.completed ? "line-through" : "none",
                  textDecorationColor:
                    showToggle && item.completed ? "salmon" : undefined,
                  color: showToggle && item.completed ? "#aaa" : "#222",
                }}
              >
                {item.name}
                {showQuantity && item.quantity > 1 ? ` (${item.quantity})` : ""}
                {showNote && item.note && (
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.7em",
                      color: "#666",
                      marginTop: "2px",
                      marginLeft: "15px",
                    }}
                    className="item-note"
                  >
                    {" "}
                    {item.note}
                  </span>
                )}
              </span>
              {/* Edit Icon */}
              {showEdit && (
                <button
                  onClick={() => onEditItem(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "0.5rem",
                  }}
                  aria-label={`Edit ${item.name}`}
                >
                  <img src={editIcon} alt="Edit" width={20} height={20} />
                </button>
              )}

              {/* Delete Icon */}
              {showDelete && (
                <button
                  onClick={() => onDeleteItem(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#c00",
                    marginLeft: "8px",
                  }}
                  aria-label="Delete favorite"
                  title="Delete"
                >
                  <img
                    src={trashIcon}
                    alt="delete"
                    style={{ width: 22, height: 22 }}
                  />
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ItemList;
