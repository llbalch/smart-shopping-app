import { createSlice } from "@reduxjs/toolkit";

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      /* add item logic*/
    },
    removeItem: (state, action) => {
      /* remove item logic*/
    },
    toggleComplete: (state, action) => {
      /* logic to toggle completed*/
    },
    editItem: (state, action) => {
      /* edit item logic*/
    },
  },
});

export const { addItem, removeItem, toggleComplete, editItem } =
  shoppingListSlice.actions;
export default shoppingListSlice.reducer;
