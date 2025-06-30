import { useState } from "react";
import { suggestCategory } from "../../utilities/suggestCategory"


function AddItemBar({ onAddItem }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const handleAdd = () => {
    const trimmed = newItemName.trim();
    if (!trimmed) return;

    onAddItem(trimmed);

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
  };

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
