import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favoritesList",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      /* add item logic*/
    },
    removeFavorite: (state, action) => {
      /* remove item logic*/
    },
    editFavorite: (state, action) => {
      /* edit item logic*/
    },
  },
});

export const { addFavorite, removeFavorite, editFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
