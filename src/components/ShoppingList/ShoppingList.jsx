import Toolbar from "../Toolbar/Toolbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetList,
  toggleCompleteAsync,
  addItemAsync,
} from "../../redux/shoppingListSlice";
import ItemList from "../ItemList/ItemList.jsx";
import {
  openEditItemModal,
  setActiveView,
  openFavoritesModal,
} from "../../redux/uiSlice.js";
import { suggestCategory } from "../../utilities/suggestCategory";
// import { showFavorites, handleSearch, handleToggleCompleted, ... }

export default function ShoppingList({ onFavoritesClick }) {
  const [completedVisible, setCompletedVisible] = useState(true);
  const dispatch = useDispatch();
  const allItems = useSelector((state) => state.shoppingList.items);
  const status = useSelector((state) => state.shoppingList.status);
  const error = useSelector((state) => state.shoppingList.error);

  const handleToggleCompleted = () => {
    setCompletedVisible((prev) => !prev);
  };

  const handleAddItem = (name) => {
    const trimmed = name.trim();
    const category = suggestCategory(trimmed) || "Uncategorized";
    dispatch(
      addItemAsync({ name: trimmed, category, quantity: 1, note: "", favorite: false })
    );
  };

  const handleAddFavoriteToShoppingList = (item) => {
    dispatch(
      addItemAsync({
        name: item.name,
        category: item.category || suggestCategory(item.name),
        completed: false,
        quantity: 1,
        note: "",
        favorite: item.favorite || false,
      })
    )
  }

  // filters the full list of items based on  completed status
  const visibleItems = allItems.filter((item) =>
    completedVisible ? true : !item.completed
  );

  return (
    <>
      
      <div>
        <h2 style={{ textAlign: "center" }}>🛒 SmartCart</h2>
        {status === "loading" && (
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>Loading items…</div>
        )}
        {status === "failed" && (
          <div style={{ color: "#c00", textAlign: "center", marginBottom: "1rem" }}>
            Failed to load items: {error}
          </div>
        )}
        {status === "succeeded" && allItems.length === 0 && (
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            No items yet. Add one to get started!
          </div>
        )}
        <Toolbar
          onFavoritesClick={onFavoritesClick}
          onAddItem={handleAddItem}
          onToggleCompleted={handleToggleCompleted}
          completedVisible={completedVisible}
        />

        <ItemList
          items={visibleItems}
          onEditItem={(itemId) => dispatch(openEditItemModal(itemId))}
          onToggleComplete={(itemId) => dispatch(toggleCompleteAsync(itemId))}
          completedVisible={completedVisible}
          onAddToList={handleAddFavoriteToShoppingList}
        />
        <button onClick={() => dispatch(resetList())}> Reset List </button>
      </div>
    </>
  );
}
