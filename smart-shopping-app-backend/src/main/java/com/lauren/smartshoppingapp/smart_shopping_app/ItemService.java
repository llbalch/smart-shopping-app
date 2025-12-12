package com.lauren.smartshoppingapp.smart_shopping_app;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final ShoppingListRepository shoppingListRepository;

    public ItemService(ItemRepository itemRepository, ShoppingListRepository shoppingListRepository) {
        this.itemRepository = itemRepository;
        this.shoppingListRepository = shoppingListRepository;
    }

    // Helper method to get or create the single shopping list
    private ShoppingList getOrCreateShoppingList() {
        List<ShoppingList> lists = shoppingListRepository.findAll();
        if (lists.isEmpty()) {
            ShoppingList newList = new ShoppingList();
            newList.setName("My Shopping List");
            return shoppingListRepository.save(newList);
        }
        return lists.get(0);
    }

    // CREATE: Add a new item to the shopping list
    public Item addItem(Item item) {
        ShoppingList shoppingList = getOrCreateShoppingList();
        validateItem(item);
        item.setShoppingList(shoppingList);
        return itemRepository.save(item);
    }

    // READ: Get all items for the shopping list
    public List<Item> getAllItems() {
        ShoppingList shoppingList = getOrCreateShoppingList();
        return shoppingList.getItems();
    }

    // READ: Get a specific item
    public Item getItemById(Long itemId) {
        return itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + itemId));
    }

    // UPDATE: Update an existing item
    public Item updateItem(Long itemId, Item updatedItem) {
        Item existingItem = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + itemId));

        validateItem(updatedItem);
        existingItem.setName(updatedItem.getName());
        existingItem.setQuantity(updatedItem.getQuantity());
        existingItem.setFavorited(updatedItem.isFavorited());
        existingItem.setCategory(updatedItem.getCategory());

        return itemRepository.save(existingItem);
    }

    // UPDATE: Toggle favorite status
    public Item toggleFavorite(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + itemId));

        item.setFavorited(!item.isFavorited());
        return itemRepository.save(item);
    }

    // DELETE: Remove an item from the shopping list
    public void deleteItem(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + itemId));
        itemRepository.delete(item);
    }

    // DELETE: Clear all items from the shopping list
    public void clearAllItems() {
        itemRepository.deleteAll();
    }

    // BUSINESS LOGIC: Validation
    private void validateItem(Item item) {
        if (item.getName() == null || item.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Item name cannot be empty");
        }
        if (item.getName().length() > 100) {
            throw new IllegalArgumentException("Item name cannot exceed 100 characters");
        }
        if (item.getQuantity() < 1) {
            throw new IllegalArgumentException("Item quantity must be at least 1");
        }
    }
}
