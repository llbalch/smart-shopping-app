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
    <div className="p-4">
      <h3>Edit Category</h3>
      <ul className="list-unstyled mb-3">
        {categories.map((category) => (
          <li key={category} className="mb-2">
            <button
              type="button"
              onClick={() => handleCategoryClick(category)}
              className={`w-100 d-flex align-items-center justify-content-between btn
                ${
                  selectedCategory === category
                    ? "btn-success fw-bold border-success"
                    : "btn-light border"
                }
                text-start`}
              style={{ borderRadius: "8px" }}
            >
              {category}
              {selectedCategory === category && (
                <span aria-label="selected" className="ms-2">
                  ✔️
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <div className="d-flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="form-control"
        />
        <button
          onClick={handleAddCategory}
          className="btn btn-outline-secondary fw-bold"
        >
          Add
        </button>
      </div>
      <div className="d-flex gap-3 mt-4">
        <button
          onClick={handleSave}
          className="btn btn-success flex-fill fw-bold"
        >
          Save
        </button>
        <button
          onClick={onBack}
          className="btn btn-outline-secondary flex-fill fw-bold"
        >
          Back
        </button>
      </div>
    </div>
  );
}
