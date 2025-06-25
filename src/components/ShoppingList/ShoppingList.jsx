import Toolbar from "../Toolbar/Toolbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  resetList,
  toggleComplete,
} from "../../redux/shoppingListSlice";
import ItemList from "../ItemList/ItemList.jsx";
import { openEditItemModal, setActiveView } from "../../redux/uiSlice.js";
// import { showFavorites, handleSearch, handleToggleCompleted, ... }

export default function ShoppingList() {
  const [completedVisible, setCompletedVisible] = useState(true);
  const dispatch = useDispatch();
  const allItems = useSelector((state) => state.shoppingList.items);

  const handleToggleCompleted = () => {
    setCompletedVisible((prev) => !prev);
  };

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  // filters the full list of items based on  completed status
  const visibleItems = allItems.filter((item) =>
    completedVisible ? true : !item.completed
  );

  const handleFavoritesClick = () => {
    dispatch(showFavorites());
  };

  return (
    <>
      <h2>🍎 Smart Shopping App</h2>
      <div>
        <Toolbar
          onFavoritesClick={() => dispatch(setActiveView("favorites"))}
          onAddItem={handleAddItem}
          onToggleCompleted={handleToggleCompleted}
          completedVisible={completedVisible}
        />

        <ItemList
          items={visibleItems}
          onEditItem={(itemId) => dispatch(openEditItemModal(itemId))}
          onToggleComplete={(itemId) => dispatch(toggleComplete(itemId))}
          completedVisible={completedVisible}
        />
        <button onClick={() => dispatch(resetList())}> Reset List </button>
      </div>
    </>
  );
}
