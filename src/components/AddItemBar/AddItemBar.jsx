import { useState } from "react";

const keywordCategoryMap = [
  {
    keywords: [
      "carrot",
      "lettuce",
      "onion",
      "apple",
      "banana",
      "broccoli",
      "spinach",
      "grapes",
      "berries",
    ],
    category: "Produce",
  },
  { keywords: ["milk", "cheese", "yogurt", "butter"], category: "Dairy" },
  { keywords: ["frozen", "ice cream", "popsicle"], category: "Frozen Foods" },
  {
    keywords: ["vitamin", "toothpaste", "deodorant", "sunscreen"],
    category: "Health/Personal Care",
  },
  { keywords: ["beef", "chicken", "pork", "turkey"], category: "Meat" },
  {
    keywords: ["bread", "bun", "bagel", "cake", "pie", "brownies"],
    category: "Bakery",
  },
  {
    keywords: ["soup", "cereal", "pasta", "rice", "noodles", "chips"],
    category: "Pantry",
  },
  {
    keywords: ["soap", "detergent", "cleaner", "spray"],
    category: "Household/Cleaning",
  },
];

function suggestCategory(itemName) {
  const name = itemName.toLowerCase();
  for (const entry of keywordCategoryMap) {
    if (entry.keywords.some((keyword) => name.includes(keyword))) {
      return entry.category;
    }
  }
  return "Other";
}

function AddItemBar({ onAddItem }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const handleAdd = () => {
    const trimmed = newItemName.trim();
    if (!trimmed) return;
    const category = suggestCategory(trimmed);

    onAddItem({
      id: Date.now(),
      name: trimmed,
      category,
      quantity: 1,
      note: "",
      favorite: false,
    });
    setNewItemName("");
    setIsAdding(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newItemName.trim() !== "") {
      handleAdd();
    }
  };
  const handleCancel = () => {
    setNewItemName("");
    setIsAdding(false);

  }

  return (
    <div className="add-item-bar">
      {!isAdding ? (
        <button onClick={() => setIsAdding(true)}>+ Add Item</button>
      ) : (
        <div>
          <input
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add Item"
            autoFocus
          />
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default AddItemBar;
