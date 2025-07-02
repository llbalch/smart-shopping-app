import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  items: [
    {
      id: "1",
      name: "Carrots",
      category: "Produce",
      quantity: 1,
      completed: false,
      note: "",
      favorite: false,
    },
    {
      id: "2",
      name: "Onions",
      category: "Produce",
      quantity: 2,
      completed: false,
      note: "",
      favorite: false,
    },
    {
      id: "3",
      name: "Ground Beef",
      category: "Meat",
      quantity: 1,
      completed: false,
      note: "",
      favorite: false,
    },
    {
      id: "4",
      name: "Milk",
      category: "Dairy",
      quantity: 1,
      completed: true,
      note: "",
      favorite: false,
    },
  ],
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState: initialState,
  reducers: {
    addItem: {
      reducer: (state, action) => {
        /* add item logic*/
        state.items.push(action.payload);
      },
      prepare({ name, category = "", quantity = 1, note = "", favorite }) {
        return {
          payload: {
            id: nanoid(),
            name,
            category,
            quantity,
            completed: false,
            note,
            favorite: false,
          },
        };
      },
    },
    removeFavorite: (state, action) => {
      /* remove item logic*/
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      /* logic to toggle completed*/
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },
    editItem: (state, action) => {
      /* edit item logic*/
      const { id, ...updates } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        Object.entries(updates).forEach(([key, value]) => {
          if (value !== undefined) {
            item[key] = value;
          }
        });
      }
    },
    toggleFavorite: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.favorite = !item.favorite;
      }
    },
    resetList() {
      return initialState;
    },
  },
});

export const {
  addItem,
  removeItem,
  toggleComplete,
  editItem,
  toggleFavorite,
  resetList,
} = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
