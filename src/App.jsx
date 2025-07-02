import { useSelector, useDispatch } from "react-redux";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import {
  setActiveView,
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
import { editItem } from "./redux/shoppingListSlice";
import { selectFavoriteItems } from "./redux/favoritesSlice";

function App() {
  const {
    activeView,
    isEditItemModalOpen,
    isEditCategoryModalOpen,
    isFavoritesModalOpen,
    editingItemId,
  } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

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

  const handleEditItem = () => {
    dispatch(closeEditItemModal());
    dispatch(openEditItemModal(editingItemId));
  };

  const handleAddFavorite = () => {
    const trimmed = newItemName.trim();
    if (!trimmed) return;
    const category = suggestCategory(trimmed);

    onAddItem({
      id: Date.now(),
      name: trimmed,
      category,
      quantity: 1,
      note: "",
      favorite: false,
    });
    setNewItemName("");
    setIsAdding(false);
  };

  const favoriteItems = useSelector(selectFavoriteItems);

  return (
    <>
      {isFavoritesModalOpen && (
        <Modal onClose={() => dispatch(closeFavoritesModal())}>
       <FavoritedItems
            onEditItem={handleEditItem}
            onAddFavorite={handleAddFavorite}
            onBack={() => dispatch(closeFavoritesModal())}
          />
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
