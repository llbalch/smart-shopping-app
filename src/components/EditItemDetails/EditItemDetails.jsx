//* Header with favorite icon, item name, and trash icon , note field option,
// Category button that opens edit category modal, quantity with increment/decrement button,
// and save and back buttons that will return user to the main screen*//
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  editItem,
  removeItem,
  toggleFavorite,
} from "../../redux/shoppingListSlice";
import { closeEditItemModal, openEditCategoryModal } from "../../redux/uiSlice";
import { addFavoriteByName, removeFavorite } from "../../redux/favoritesSlice";
import trashIcon from "../../assets/images/trash.png";
import blackHeart from "../../assets/images/blackHeart.png";
import redHeart from "../../assets/images/redHeart.png";

export default function EditItemDetails({ itemId, onClose }) {
  const dispatch = useDispatch();
  const item = useSelector((state) =>
    state.shoppingList.items.find((i) => i.id === itemId)
  );
  console.log("EditItemDetails item:", item);
  const items = useSelector((state) => state.shoppingList.items);

  // Local state for editable fields (notes/quantity/category)
  const [note, setNote] = React.useState(item?.note || "");
  const [quantity, setQuantity] = React.useState(item?.quantity || 1);
  const [itemCategory, setItemCategory] = React.useState(item?.category || "");

  // If category is passed as a prop from (EditCategory modal), update local state
  React.useEffect(() => {
    setItemCategory(item?.category || "");
  }, [item?.category]);

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

  const handleToggleFavorite = (itemId) => {
    dispatch(toggleFavorite(itemId));
    const item = items.find((item) => item.id === itemId);
    if (item && !item.favorite) {
      dispatch(addFavoriteByName(item.name));
    } else {
      dispatch(removeFavorite(itemId));
    }
  };

  return (
    <>
    <div className="modal-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}>

      <button
        onClick={() => handleToggleFavorite(itemId)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "12px",
          marginRight: "5px",
        }}
        aria-label={item.favorite ? "Unmark as favorite" : "Mark as favorite"}
      >
        {" "}
        <img
          src={item.favorite ? redHeart : blackHeart}
          alt={item.favorite ? "Favorited" : "Not Favorited"}
          style={{ width: 28, height: 28 }}
        />
      </button>
         <span
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            flex: 1,
            textAlign: "center",
          }}
        >
          {item.name}
        </span>
        <button
          onClick={handleDelete}
          style={{ background: "none", border: "none" }}
          aria-label="Delete"
        >
          <img src={trashIcon} alt="delete" style={{ width: 24, height: 24 }} />
        </button>
    </div>
          <div style={{ margin: "2rem 1rem" }}>
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
        <button
          onClick={() => dispatch(openEditCategoryModal())}
          style={{ padding: "0.5rem 1rem" }}
        >
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


    
    </>
  );
}
