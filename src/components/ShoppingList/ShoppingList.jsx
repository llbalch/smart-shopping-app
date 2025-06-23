import Toolbar from "../Toolbar/Toolbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, resetList, toggleComplete } from "../../redux/shoppingListSlice";
import ItemList from "../ItemList/ItemList.jsx";
import { openEditItemModal, setActiveView } from "../../redux/uiSlice.js";
// import { showFavorites, handleSearch, handleToggleCompleted, ... }

export default function ShoppingList() {
  const [completedVisible, setCompletedVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const allItems = useSelector((state) => state.shoppingList.items);

  const handleToggleCompleted = () => {
    setCompletedVisible((prev) => !prev);
  };

  const handleAddItem = (itemName) => {
    dispatch(
      addItem({
        name: itemName,
        category: "",
        quantity: 1,
        completed: false,
        note: "",
      })
    );
  };

  // user types in search bar and updates the search term state
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // filters the full list of items based on search term and completed status
  const filteredItems = allItems.filter((item) => {
    const matchesSearchTerm = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCompleted = completedVisible ? true : !item.completed;
    return matchesSearchTerm && matchesCompleted;
  });

  const handleFavoritesClick = () => {
    dispatch(showFavorites());
  };

  return (
    <>
      <h2>🍎 Smart Shopping App</h2>
      <div>
        <Toolbar
          onFavoritesClick={() => dispatch(setActiveView('favorites'))}
          onAddItem={handleAddItem}
          onToggleCompleted={handleToggleCompleted}
          completedVisible={completedVisible}
          onSearch={handleSearch}
        />

        <ItemList items={filteredItems} onEditItem={itemId => dispatch(openEditItemModal(itemId))} onToggleComplete={itemId => dispatch(toggleComplete(itemId))} completedVisible={completedVisible} />
        <button onClick={() => dispatch(resetList())}> Reset List </button>
      </div>
    </>
  );
}
