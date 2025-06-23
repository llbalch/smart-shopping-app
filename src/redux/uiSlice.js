import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeView: "shoppingList",

  // modal management
  isEditItemModalOpen: false,
  isEditCategoryModalOpen: false,

  // track item by id that is currently under edit
  editingItemId: null,

  // manages visibility of completed items
  completedVisible: true,
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // navigation to shoppingList or favorites
    setActiveView(state, action) {
      state.activeView = action.payload;
      if (action.payload !== "editItem") {
        state.editingItemId = null;
      }
    },

    // edit item details modal
    openEditItemModal(state, action) {
      state.isEditItemModalOpen = true;
      state.editingItemId = action.payload;
    },

    closeEditItemModal(state) {
      state.isEditItemModalOpen = false;
      state.editingItemId = null;
    },

    // edit category modal
    openEditCategoryModal(state) {
      state.isEditCategoryModalOpen = true;
    },
    closeEditCategoryModal(state) {
      state.isEditCategoryModalOpen = false;
    },

    // toggle completed items visibility
    toggleCompletedVisible(state) {
      state.completedVisible = !state.completedVisible;
    },

    setCompletedVisible(state, action) {
      state.completedVisible = action.payload;
    },
  },
});

export const {
  setActiveView,
  openEditItemModal,
  closeEditItemModal,
  openEditCategoryModal,
  closeEditCategoryModal,
  toggleCompletedVisible,
  setCompletedVisible,
} = uiSlice.actions;
export default uiSlice.reducer;
