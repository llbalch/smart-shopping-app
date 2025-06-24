//* Group Items by category, category headers, display each item with name and (quantity), show a pencil icon that opens edit details when clicked, allow toggling (complete/ incomplete)
// strikethrough on click for marking complete *//
import React from "react";
import editIcon from "../../assets/images/pencil.png";

const CATEGORY_COLORS = {
  Produce: "#b4eeb4",
  Meat: "#ffe5b4",
  Dairy: "#e0e0ff",
  "Frozen Foods": "#c0f0ff",
  Snacks: "#ffe5b4",
  Bakery: "#ffe5b4",
  Beverages: "#ffe5b4",
  "Household/Cleaning": "#ffe5b4",
};

function ItemList({ items, onEditItem, onToggleComplete }) {
  // Group items by category
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categoryOrder = [
    "Produce",
    "Meat",
    "Dairy",
    "Frozen Foods",
    "Snacks",
    "Bakery",
    "Beverages",
    "Household/Cleaning",
  ];

  return (
    <div>
      {categoryOrder.map(
        (category) =>
          grouped[category] && (
            <div key={category}>
              {/* Category Header */}
              <div
                style={{
                  background: CATEGORY_COLORS[category] || "#eee",
                  padding: "0.5rem",
                  fontWeight: "bold",
                  borderRadius: "6px",
                  margin: "1rem 0 0.5rem 0",
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
                  {/* Item Name and Quantity */}
                  <span
                    onClick={() => onToggleComplete(item.id)}
                    style={{
                      flex: 1,
                      cursor: "pointer",
                      textDecoration: item.completed ? "line-through" : "none",
                      color: item.completed ? "#aaa" : "#222",
                    }}
                  >
                    {item.name}
                    {item.quantity > 1 ? ` (${item.quantity})` : ""}
                    {item.note && (
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
                </div>
              ))}
            </div>
          )
      )}
    </div>
  );
}

export default ItemList;
