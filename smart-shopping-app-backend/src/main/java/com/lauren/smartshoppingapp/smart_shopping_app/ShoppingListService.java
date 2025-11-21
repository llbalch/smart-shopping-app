package com.lauren.smartshoppingapp.smart_shopping_app;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ShoppingListService {

    private final ShoppingListRepository shoppingListRepository;
    private final ItemRepository itemRepository;

    public ShoppingListService(ShoppingListRepository shoppingListRepository, ItemRepository itemRepository) {
        this.shoppingListRepository = shoppingListRepository;
        this.itemRepository = itemRepository;
    }

    // READ: Get the single shopping list
    public ShoppingList getShoppingList() {
        List<ShoppingList> lists = shoppingListRepository.findAll();
        if (lists.isEmpty()) {
            return null;
        }
        return lists.get(0);
    }

    // CREATE: Create a new shopping list (enforce only one)
    public ShoppingList createShoppingList(ShoppingList shoppingList) {
        if (!shoppingListRepository.findAll().isEmpty()) {
            throw new IllegalStateException("A shopping list already exists. Only one shopping list is allowed.");
        }
        validateShoppingListName(shoppingList.getName());
        return shoppingListRepository.save(shoppingList);
    }

    // UPDATE: Update the single shopping list
    public ShoppingList updateShoppingList(ShoppingList updatedList) {
        List<ShoppingList> lists = shoppingListRepository.findAll();
        if (lists.isEmpty()) {
            throw new RuntimeException("No shopping list exists to update.");
        }
        ShoppingList existingList = lists.get(0);
        validateShoppingListName(updatedList.getName());
        existingList.setName(updatedList.getName());
        return shoppingListRepository.save(existingList);
    }

    // DELETE: Delete the single shopping list
    public void deleteShoppingList() {
        List<ShoppingList> lists = shoppingListRepository.findAll();
        if (lists.isEmpty()) {
            throw new RuntimeException("No shopping list exists to delete.");
        }
        shoppingListRepository.delete(lists.get(0));
    }

    // BUSINESS LOGIC: Validation
    private void validateShoppingListName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Shopping list name cannot be empty");
        }
        if (name.length() > 100) {
            throw new IllegalArgumentException("Shopping list name cannot exceed 100 characters");
        }
    }
}
