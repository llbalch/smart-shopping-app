import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItems, createItem, updateItem as apiUpdateItem, removeItem as apiRemoveItem, toggleFavorite as apiToggleFavorite, toggleComplete as apiToggleComplete } from "../utilities/apiClient";
const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const loadItems = createAsyncThunk("shoppingList/loadItems", async () => {
  const data = await getItems();
  return data;
});

export const addItemAsync = createAsyncThunk("shoppingList/addItem", async (item) => {
  const created = await createItem(item);
  return created;
});

export const editItemAsync = createAsyncThunk("shoppingList/editItem", async ({ id, updates }) => {
  const updated = await apiUpdateItem(id, updates);
  return updated;
});

export const removeItemAsync = createAsyncThunk("shoppingList/removeItem", async (id) => {
  await apiRemoveItem(id);
  return id;
});

export const toggleFavoriteAsync = createAsyncThunk("shoppingList/toggleFavorite", async (id) => {
  const updated = await apiToggleFavorite(id);
  return updated;
});

export const toggleCompleteAsync = createAsyncThunk("shoppingList/toggleComplete", async (id) => {
  const updated = await apiToggleComplete(id);
  return updated;
});

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState: initialState,
  reducers: {
    // keep reset only; mutations now occur via async thunks
    resetList() {
      return { ...initialState, items: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editItemAsync.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.items.findIndex((i) => i.id === updated.id);
        if (idx !== -1) state.items[idx] = updated;
      })
      .addCase(removeItemAsync.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter((i) => i.id !== id);
      })
      .addCase(toggleFavoriteAsync.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.items.findIndex((i) => i.id === updated.id);
        if (idx !== -1) state.items[idx] = updated;
      })
      .addCase(toggleCompleteAsync.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.items.findIndex((i) => i.id === updated.id);
        if (idx !== -1) state.items[idx] = updated;
      });
  },
});

export const { resetList } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
