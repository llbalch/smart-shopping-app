//* Header with favorite icon, item name, and trash icon , note field option,
// Category button that opens edit category modal, quantity with increment/decrement button,
// and save and back buttons that will return user to the main screen*//
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editItem, removeItem } from "../../redux/shoppingListSlice";
import { closeEditItemModal } from "../../redux/uiSlice";
import heartIcon from "../../assets/images/heart.png";
import trashIcon from "../../assets/images/trash.png";

export default function EditItemDetails({
  itemId,
  onClose,
  onEditItemCategory,
  category,
}) {
  const dispatch = useDispatch();
  const item = useSelector((state) =>
    state.shoppingList.items.find((i) => i.id === itemId)
  );

  // Local state for editable fields (notes/quantity/category)
  const [note, setNote] = React.useState(item?.note || "");
  const [quantity, setQuantity] = React.useState(item?.quantity || 1);
  const [itemCategory, setItemCategory] = React.useState(item?.category || "");

  // If category is passed as a prop from (EditCategory modal), update local state
  React.useEffect(() => {
    if (category) setItemCategory(category);
  }, [category]);

  if (!item) return null;

  const handleSave = () => {
    dispatch(
      editItem({
        id: itemId,
        note,
        quantity,
        category: itemCategory,
      })
    );
    if (onClose) onClose();
    else dispatch(closeEditItemModal());
  };

  const handleDelete = () => {
    dispatch(removeItem(itemId));
    if (onClose) onClose();
    else dispatch(closeEditItemModal());
  };

  return (
    <div className="modal edit-item-details">
      <div
        className="modal-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src={heartIcon} alt="favorite" style={{ width: 28, height: 28 }} />
        <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          {item.name}
        </span>
        <button
          onClick={handleDelete}
          style={{ background: "none", border: "none" }}
        >
          <img src={trashIcon} alt="delete" style={{ width: 28, height: 28 }} />
        </button>
      </div>
      <div style={{ margin: "1rem 0" }}>
        <input
          type="text"
          placeholder="+ Add Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      {/* Category and Quantity*/}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <button onClick={onEditItemCategory} style={{ padding: "0.5rem 1rem" }}>
          {item.category || "Select Category"}
        </button>

        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          style={{ marginRight: 8 }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity((q) => Math.max(1, q + 1))}
          style={{ marginLeft: 8 }}
        >
          +
        </button>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={handleSave} style={{ flex: 1, background: "#b4eeb4" }}>
          Save
        </button>
        <button onClick={onClose} style={{ flex: 1 }}>
          Back{" "}
        </button>
      </div>
    </div>
  );
}
