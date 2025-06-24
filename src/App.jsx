import { useSelector, useDispatch } from "react-redux";
import styles from "./App.module.css";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import {
  setActiveView,
  openEditItemModal,
  closeEditItemModal,
  openEditCategoryModal,
  closeEditCategoryModal,
} from "./redux/uiSlice";
import EditItemDetails from "../src/components/EditItemDetails/EditItemDetails";
import EditCategoryDetails from "../src/components/EditCategoryDetails/EditCategoryDetails";
import FavoritedItems from "../src/components/FavoritedItems/FavoritedItems";
import Modal from "../src/components/Modal/Modal";

function App() {
  const {
    activeView,
    isEditItemModalOpen,
    isEditCategoryModalOpen,
    editingItemId,
  } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  return (
    <div>
      {activeView === "shoppingList" && <ShoppingList />}

      {activeView === "favorites" && (
        <FavoritedItems
          onBack={() => dispatch(setActiveView("shoppingList"))}
        />
      )}
      {isEditItemModalOpen && (
        <Modal onClose={() => dispatch(closeEditItemModal())}>
          <EditItemDetails
            itemId={editingItemId}
            onClose={() => dispatch(closeEditItemModal())}
            onEditCategory={() => dispatch(openEditCategoryModal())}
          />
        </Modal>
      )}
      {isEditCategoryModalOpen && (
        <Modal onClose={() => dispatch(closeEditCategoryModal())}>
          <EditCategoryDetails
            onSave={() => {
              dispatch(closeEditCategoryModal());
              dispatch(openEditItemModal(editingItemId));
            }}
            onBack={() => {dispatch(closeEditCategoryModal())
              dispatch(openEditItemModal(editingItemId))
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
