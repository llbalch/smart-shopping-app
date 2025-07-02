import Toolbar from "../Toolbar/Toolbar";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  resetList,
  toggleComplete,
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

  const handleToggleCompleted = () => {
    setCompletedVisible((prev) => !prev);
  };

  const handleAddItem = (name) => {
    const trimmed = name.trim();
    const category = suggestCategory(trimmed) || "Uncategorized";

    dispatch(
      addItem({
        id: nanoid(),
        name: trimmed,
        category,
        quantity: 1,
        note: "",
        favorite: false,
      })
    );
  };

  const handleAddFavoriteToShoppingList = (item) => {
    dispatch(
      addItem({
        ...item,
        id: nanoid(),
        category: item.category || suggestCategory(item.name),
        completed: false,
        quantity: 1,
        note: "",
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
        <h2 style={{ textAlign: "center" }}>🍎 SmartCart</h2>
        <Toolbar
          onFavoritesClick={onFavoritesClick}
          onAddItem={handleAddItem}
          onToggleCompleted={handleToggleCompleted}
          completedVisible={completedVisible}
        />

        <ItemList
          items={visibleItems}
          onEditItem={(itemId) => dispatch(openEditItemModal(itemId))}
          onToggleComplete={(itemId) => dispatch(toggleComplete(itemId))}
          completedVisible={completedVisible}
          onAddToList={handleAddFavoriteToShoppingList}
        />
        <button onClick={() => dispatch(resetList())}> Reset List </button>
      </div>
    </>
  );
}
