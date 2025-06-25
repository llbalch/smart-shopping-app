import { DEFAULT_CATEGORIES } from "../../constants/categories";
import { useState } from "react";

export default function EditCategoryDetails({
  currentCategory,
  onSave,
  onBack,
}) {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [newCategory, setNewCategory] = useState("");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (
      trimmed &&
      !categories.some(
        (category) => category.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      setCategories([...categories, trimmed]);
      setSelectedCategory(trimmed);
      setNewCategory("");
    }
  };

  const handleSave = () => {
    if (selectedCategory) {
      onSave(selectedCategory);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h3>Edit Category</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.map((category) => (
          <li key={category} style={{ margin: "8px 0" }}>
            <button
              type="button"
              onClick={() => handleCategoryClick(category)}
              style={{
                width: "100%",
                padding: "0.75rem",
                background:
                  selectedCategory === category ? "#b4eeb4" : "#f7f7f7",
                border:
                  selectedCategory === category
                    ? "2px solid #4caf50"
                    : "1px solid #ccc",
                borderRadius: 8,
                textAlign: "left",
                fontWeight: selectedCategory === category ? "bold" : "normal",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {category}
              {selectedCategory === category && (
                <span aria-label="selected" style={{ marginLeft: 8 }}>
                  ✔️
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <input
          type="text"
          placeholder="Add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ flex: 2, padding: "0.5rem" }}
        />
        <button
          onClick={handleAddCategory}
          style={{
            flex: 1,
            background: "#e0e0e0",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
      <div style={{ display: "flex", gap: "1rem", marginTop: 24 }}>
        <button
          onClick={handleSave}
          style={{
            flex: 1,
            background: "#b4eeb4",
            border: "none",
            borderRadius: 8,
            padding: "0.75rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Save
        </button>
        <button
          onClick={onBack}
          style={{
            flex: 1,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: "0.75rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
