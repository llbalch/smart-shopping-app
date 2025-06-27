import { configureStore } from "@reduxjs/toolkit";
import shoppingListReducer from "../src/redux/shoppingListSlice"
import uiReducer from "../src/redux/uiSlice";

export function setupTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      shoppingList: shoppingListReducer,
      ui: uiReducer,
    },
    preloadedState,
  });
}
