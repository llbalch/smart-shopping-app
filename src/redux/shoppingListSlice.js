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
    },
    {
      id: "2",
      name: "Onions",
      category: "Produce",
      quantity: 2,
      completed: false,
      note: "",
    },
    {
      id: "3",
      name: "Ground Beef",
      category: "Meat",
      quantity: 1,
      completed: false,
      note: "",
    },
    {
      id: "4",
      name: "Milk",
      category: "Dairy",
      quantity: 1,
      completed: true,
      note: "",
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
      prepare({ name, category = '', quantity = 1, note = '' }) {
        return {
          payload: {
            id: nanoid(),
            name,
            category,
            quantity,
            completed: false,
            note,
          },
        };
      },
    },
    removeItem: (state, action) => {
      /* remove item logic*/
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      /* logic to toggle completed*/
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },
    editItem: (state, action) => {
      /* edit item logic*/
      const { id, name, category, quantity, note } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        if (name !== undefined) item.name = name;
        if (category !== undefined) item.category = category;
        if (quantity !== undefined) item.quantity = quantity;
        if (note !== undefined) item.note = note;
      }
    },
    resetList() {
      return initialState;
    }
  },
});

export const { addItem, removeItem, toggleComplete, editItem , resetList } =
  shoppingListSlice.actions;
export default shoppingListSlice.reducer;
