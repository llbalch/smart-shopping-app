// use a mock Redux store, or mock the selector and dispatch if you are testing the component in isolation.
// render EditItemDetails with a known item in the store
// simulate user action - change quantity, note or category and click save
// assert that the save handler (or redux dispatch) is called with updated data
// assert that the modal closes

import { render, screen, fireEvent } from "@testing-library/react";
import EditItemDetails from "./EditItemDetails";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockItem = {
  id: 1,
  name: "Carrots",
  category: "Produce",
  quantity: 1,
  note: "",
};
const mockStore = configureStore([]);
const store = mockStore({
  shoppingList: { items: [mockItem] },
  ui: { editingItemId: 1 },
});

test("shows item details and allows editing", () => {
  const onClose = jest.fn();
  store.dispatch = jest.fn();

  render(
    <Provider store={store}>
      <EditItemDetails itemId={1} onClose={onClose} />
    </Provider>
  );

  // check that item name is displayed
  expect(screen.getByDisplayValue("Carrots")).toBeInTheDocument();

  // modal shows correct initial data
  const category = screen.getByRole("button", { name: /produce/i });
  expect(category).toHaveTextContent("Produce");
  expect(screen.getByText("1")).toBeInTheDocument();
  const note = screen.getByPlaceholderText(/\+ Add Note/i);
  expect(note.value).toBe("");

  test("simulate user action - changing quantity", () => {
    const plusButton = screen.getByText("+");
    const minusButton = screen.getByText("-");

    fireEvent.click(plusButton);
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(minusButton);
    expect(screen.getByText("1")).toBeInTheDocument();

    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(screen.getByText("3")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/save/i));

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "shoppingList/editItem",
      payload: {
        id: 1,
        note: "",
        quantity: 3,
        category: "Produce",
      },
    });

    expect(onClose).toHaveBeenCalled();
  });

  // simulate user action - adding a note
  test("simulate user action - adding a note", () => {
    const noteInput = screen.getByPlaceholderText(/+ Add Note/i);
    fireEvent.change(noteInput, { target: { value: "For salad" } });
    expect(noteInput.value).toBe("For salad");
    fireEvent.click(screen.getByText(/save/i));
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "shoppingList/editItem",
      payload: {
        id: 1,
        note: "For salad",
        quantity: 3,
        category: "Produce",
      },
    });
    expect(onClose).toHaveBeenCalledWith();
  });

  // simulate user action - clicking category
  test("simulate user action- clicking to change category", () => {
    const categoryButton = screen.getByRole("button", { name: /produce/i });
    fireEvent.click(categoryButton);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "ui/openEditCategoryModal",
    });
    expect(screen.getByText(/edit category/i)).toBeInTheDocument();
  });
});
