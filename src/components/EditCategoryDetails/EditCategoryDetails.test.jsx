import React from "react"
import { render, screen, fireEvent } from "@testing-library/react";
import EditItemDetails from "../EditItemDetails/EditItemDetails";
import EditCategoryDetails from "../EditCategoryDetails/EditCategoryDetails";
import { Provider } from "react-redux";
import { setupTestStore } from "../../../__tests__/testUtils";

const mockItem = {
  id: 1,
  name: "Carrots",
  category: "Produce",
  quantity: 1,
  note: "",
  favorite: false,
};

const categories = [
  "Produce",
  "Meat",
  "Dairy",
  "Frozen Foods",
  "Pantry",
  "Bakery",
  "Health/Personal Care",
  "Household/Cleaning",
  "Other",
];

test("selects a new category and saves", () => {
  // set up store with initial state
  const store = setupTestStore({
    shoppingList: { items: [mockItem] },
    ui: { editingItemId: 1, isEditCategoryModalOpen: false },
  });
  // render editItemDetails
  const onClose = jest.fn()
  store.dispatch = jest.fn();

  render(
    <Provider store={store}>
      <EditItemDetails itemId={1} onClose={onClose} />{" "}
    </Provider>
  );
  // simulate opening edit category modal
  const categoryButton = screen.getByRole("button", { name: /produce/i });
  fireEvent.click(categoryButton);
  // simulate editCategoryDetails modal
  render(
    <Provider store={store}>
      <EditCategoryDetails
        categories={categories}
        selectedCategory="Produce"
        onSave={(newCategory) => {
          store.dispatch({
            type: "shoppingList/editItem",
            payload: { id: 1, category: newCategory },
          });
        }}
        onBack={() => {}}
      />
    </Provider>
  );

  // select dairy as new category
  const dairyButton = screen.getByRole("button", { name: /dairy/i });
  fireEvent.click(dairyButton);
  // save new category
  fireEvent.click(screen.getByLabelText(/save category/i));

  // assert correct redux action was dispatched, stores state will no reflect change
  expect(store.getState().shoppingList.items[0].category).toBe("Produce");
  expect(store.dispatch).toHaveBeenCalledWith({
    type: "shoppingList/editItem",
    payload: { id: 1, category: "Dairy" },
  });
});
