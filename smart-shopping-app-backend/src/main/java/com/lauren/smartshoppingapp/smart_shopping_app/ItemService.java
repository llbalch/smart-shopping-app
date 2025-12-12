package com.lauren.smartshoppingapp.smart_shopping_app;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final ShoppingListRepository shoppingListRepository;
    private final CategoryRepository categoryRepository;

    public ItemService(ItemRepository itemRepository, ShoppingListRepository shoppingListRepository,
            CategoryRepository categoryRepository) {
        this.itemRepository = itemRepository;
        this.shoppingListRepository = shoppingListRepository;
        this.categoryRepository = categoryRepository;
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

    // Helper method to find or create a category by name
    private Category findOrCreateCategory(String categoryName) {
        if (categoryName == null || categoryName.trim().isEmpty()) {
            return null;
        }
        return categoryRepository.findByName(categoryName)
                .orElseGet(() -> {
                    Category newCategory = new Category();
                    newCategory.setName(categoryName);
                    newCategory.setColor("#cccccc"); // default color
                    return categoryRepository.save(newCategory);
                });
    }

    // CREATE: Add a new item to the shopping list
    public Item addItem(Item item) {
        ShoppingList shoppingList = getOrCreateShoppingList();
        validateItem(item);
        if (item.getCategory() != null && item.getCategory().getName() != null) {
            Category category = findOrCreateCategory(item.getCategory().getName());
            item.setCategory(category);
        }
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
                .orElseThrow(() -> new NoSuchElementException("Item not found with id: " + itemId));
    }

    // UPDATE: Update an existing item
    public Item updateItem(Long itemId, Item updatedItem) {
        Item existingItem = itemRepository.findById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item not found with id: " + itemId));

        validateItem(updatedItem);
        existingItem.setName(updatedItem.getName());
        existingItem.setQuantity(updatedItem.getQuantity());
        existingItem.setFavorited(updatedItem.isFavorited());
        if (updatedItem.getCategory() != null && updatedItem.getCategory().getName() != null) {
            Category category = findOrCreateCategory(updatedItem.getCategory().getName());
            existingItem.setCategory(category);
        }

        return itemRepository.save(existingItem);
    }

    // UPDATE: Toggle favorite status
    public Item toggleFavorite(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item not found with id: " + itemId));

        item.setFavorited(!item.isFavorited());
        return itemRepository.save(item);
    }

    // DELETE: Remove an item from the shopping list
    public void deleteItem(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item not found with id: " + itemId));
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
