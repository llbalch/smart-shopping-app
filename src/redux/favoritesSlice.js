import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  suggestions: [
    /* add logic to suggest items based on previous purchases*/
  ],
};

const favoritesSlice = createSlice({
  name: "favoritesList",
  initialState,
  reducers: {
    addFavoriteToShoppingList: (state, action) => {
      // action.payload = item object
      const exists = state.items.some(
        (item) => item.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      if (!exists) {
        state.items.push({
          ...action.payload,
          completed: false,
          quantity: 1 /* will need to modify */,
          note: "",
        });
      }
    },
    removeFavorite: (state, action) => {
      // action.payload = { id }
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    editFavorite: (state, action) => {
      /* edit item logic*/
    },
    setSuggestions: (state, action) => {
      //action.payload = array of suggested items
      state.suggestions = action.payload;
    },
    addFavoriteByName: (state, action) => {
      // action.payload = name
      const exists = state.items.some(
        (item) => item.name.toLowerCase() === action.payload.toLowerCase()
      );
      if (!exists) {
        state.items.push({
          id: Date.now().toString(),
          name: action.payload,
          category: "",
        });
      }
    },
  },
});

export const {
  addFavoriteToShoppingList,
  removeFavorite,
  editFavorite,
  setSuggestions,
  addFavoriteByName,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
