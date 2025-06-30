// Setting up store structure for the state slices

import { configureStore } from "@reduxjs/toolkit";
import shoppingListReducer from './shoppingListSlice';
import favoritesReducer from './favoritesSlice'
import uiReducer from './uiSlice';

export default configureStore({
    reducer: {
        shoppingList: shoppingListReducer,
        favoritesList: favoritesReducer,
        ui: uiReducer,
    }
})