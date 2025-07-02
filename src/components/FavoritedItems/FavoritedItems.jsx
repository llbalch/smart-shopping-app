import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

import AddItemBar from "../AddItemBar/AddItemBar";
import {
  addFavoriteByName,
  selectFavoriteItems,
  selectFavoriteSuggestions,
  removeFavorite
} from "../../redux/favoritesSlice";
import { addItem } from "../../redux/shoppingListSlice";
import { suggestCategory } from "../../utilities/suggestCategory";
import { openEditItemModal, closeFavoritesModal } from "../../redux/uiSlice";
import "../Modal/Modal.css";
import { ItemList } from "../ItemList/ItemList";

export default function FavoritedItems() {
  const dispatch = useDispatch();

  // Get redux data directly
  const items = useSelector(selectFavoriteItems);
  const suggestions = useSelector(selectFavoriteSuggestions);
  console.log("FavoritedItems items:", items);
  console.log("FavoritedItems suggestions:", suggestions);

  const favorites = useSelector(selectFavoriteItems);

  const handleAddFavorite = (name) => {
    if (!name || typeof name !== "string" || !name.trim()) return;
    dispatch(addFavoriteByName(name.trim()));
  };

  const handleAddFavoriteToShoppingList = (item) => {
    const category = suggestCategory(item.name);
    dispatch(
      addItem({
        ...item,
        id: nanoid(),
        category,
        completed: false,
        quantity: 1,
        note: "",
      })
    );
  };

  const handleEditFavorite = (itemId) => {
    dispatch(openEditItemModal(itemId));
  };

const handleDeleteFavorite = (itemId) => {
  dispatch(removeFavorite(itemId));
};

  return (
    <>
    <div className="favorite-item-list-modal"  style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}><span
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            flex: 1,
            textAlign: "center",
          }}
        >
          Favorited Items
        </span>
        </div>
      <AddItemBar
          buttonText="+ Add Favorite Item"
          variant="primary"
          className="add-fav-item-bar"
          onAddItem={handleAddFavorite}
        />
        <ItemList
          items={items}
          onEditItem={handleEditFavorite}
          onAddToList={handleAddFavoriteToShoppingList}
          onDeleteItem={handleDeleteFavorite}
          showPlus={true}
          showToggle={false}
          showQuantity={false}
          showNote={false}
          showEdit={false}
          showDelete={true}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={() => dispatch(closeFavoritesModal())}>Back</button>
        </div>
 </>

);
}