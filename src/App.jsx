import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import {

  openEditItemModal,
  closeEditItemModal,
  openEditCategoryModal,
  closeEditCategoryModal,
  openFavoritesModal,
  closeFavoritesModal,
} from "./redux/uiSlice";
import EditItemDetails from "../src/components/EditItemDetails/EditItemDetails";
import EditCategoryDetails from "../src/components/EditCategoryDetails/EditCategoryDetails";
import FavoritedItems from "../src/components/FavoritedItems/FavoritedItems";
import Modal from "../src/components/Modal/Modal";
import { editItem, fetchShoppingLists } from "./redux/shoppingListSlice";

function App() {
  const {
    activeView,
    isEditItemModalOpen,
    isEditCategoryModalOpen,
    isFavoritesModalOpen,
    editingItemId,
  } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  // Fetch shopping lists from backend on mount (thunk logic)
  useEffect(() => {
    dispatch(fetchShoppingLists());
  }, [dispatch]);

  // find the actual item object in Redux store to get its category prop
  const editingItem = useSelector((state) =>
    state.shoppingList.items.find((item) => item.id === editingItemId)
  );
  const itemCategory = editingItem?.category || "";

  const handleCategorySave = (newCategory) => {
    dispatch(
      editItem({
        id: editingItemId,
        category: newCategory,
      })
    );
    dispatch(closeEditCategoryModal());
    dispatch(openEditItemModal(editingItemId));
  };

  const handleFavoritesClick = () => {
    dispatch(openFavoritesModal());
  };


  return (
    <>
      {isFavoritesModalOpen && (
        <Modal onClose={() => dispatch(closeFavoritesModal())}>
       <FavoritedItems onBack={() => dispatch(closeFavoritesModal())} />
        </Modal>
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
            currentCategory={itemCategory}
            onSave={handleCategorySave}
            onBack={() => {
              dispatch(closeEditCategoryModal());
              dispatch(openEditItemModal(editingItemId));
            }}
          />
        </Modal>
      )}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ maxWidth: "200vh", minHeight: "100vh", width: "100vw" }}
      >
        {activeView === "shoppingList" && (
          <ShoppingList onFavoritesClick={handleFavoritesClick} />
        )}
      </div>
    </>
  );
}

export default App;
