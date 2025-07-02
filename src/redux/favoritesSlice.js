import { STATEMENT_TYPES } from "@babel/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [{
      id: "5",
      name: "Laundry Detergent",
      category: "Household/Cleaning",
      quantity: 1,
      completed: false,
      note: "",
      favorite: true,
    },
    {
      id: "6",
      name: "Beans",
      category: "Pantry",
      quantity: 1,
      completed: false,
      note: "",
      favorite: true,
    },
    {
      id: "7",
      name: "Chicken",
      category: "Meat",
      quantity: 1,
      completed: false,
      note: "",
      favorite: true,
    },],
  suggestions: [
    /* add logic to suggest items based on previous purchases*/
  ],
};

const favoritesSlice = createSlice({
  name: "favoritesList",
  initialState,
  reducers: {
    removeFavorite: (state, action) => {
      // action.payload = { id }
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    editFavorite: (state, action) => {
      /* edit item logic*/
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
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
  removeFavorite,
  editFavorite,
  setSuggestions,
  addFavoriteByName,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;

// ensure that selectors always return arrays - no .map errors in components
export const selectFavoriteItems = (state) => state.favoritesList.items || [];

export const selectFavoriteSuggestions = (state) =>
  state.favoritesList.suggestions || [];
