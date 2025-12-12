package com.lauren.smartshoppingapp.smart_shopping_app;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ItemServiceTest {

    @Mock
    private ItemRepository itemRepository;

    @Mock
    private ShoppingListRepository shoppingListRepository;

    @InjectMocks
    private ItemService itemService;

    private ShoppingList shoppingList;
    private Item item;
    private Category category;

    @BeforeEach
    void setUp() {
        shoppingList = new ShoppingList();
        shoppingList.setId(1L);
        shoppingList.setName("My Shopping List");

        category = new Category();
        category.setId(1L);
        category.setName("Groceries");

        item = new Item();
        item.setId(1L);
        item.setName("Milk");
        item.setQuantity(2);
        item.setFavorited(false);
        item.setCategory(category);
        item.setShoppingList(shoppingList);
    }

    @Test
    void addItem_Success() {
        when(shoppingListRepository.findAll()).thenReturn(Arrays.asList(shoppingList));
        when(itemRepository.save(any(Item.class))).thenReturn(item);

        Item newItem = new Item();
        newItem.setName("Milk");
        newItem.setQuantity(2);
        newItem.setCategory(category);

        Item result = itemService.addItem(newItem);

        assertNotNull(result);
        assertEquals("Milk", result.getName());
        assertEquals(2, result.getQuantity());
        verify(itemRepository, times(1)).save(any(Item.class));
    }

    @Test
    void addItem_CreatesShoppingListIfNotExists() {
        when(shoppingListRepository.findAll()).thenReturn(Collections.emptyList());
        when(shoppingListRepository.save(any(ShoppingList.class))).thenReturn(shoppingList);
        when(itemRepository.save(any(Item.class))).thenReturn(item);

        Item newItem = new Item();
        newItem.setName("Milk");
        newItem.setQuantity(2);
        newItem.setCategory(category);

        Item result = itemService.addItem(newItem);

        assertNotNull(result);
        verify(shoppingListRepository, times(1)).save(any(ShoppingList.class));
        verify(itemRepository, times(1)).save(any(Item.class));
    }

    @Test
    void addItem_InvalidName_Empty() {
        when(shoppingListRepository.findAll()).thenReturn(Arrays.asList(shoppingList));

        Item newItem = new Item();
        newItem.setName("");
        newItem.setQuantity(2);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            itemService.addItem(newItem);
        });

        assertEquals("Item name cannot be empty", exception.getMessage());
    }

    @Test
    void addItem_InvalidName_TooLong() {
        when(shoppingListRepository.findAll()).thenReturn(Arrays.asList(shoppingList));

        Item newItem = new Item();
        newItem.setName("a".repeat(101));
        newItem.setQuantity(2);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            itemService.addItem(newItem);
        });

        assertEquals("Item name cannot exceed 100 characters", exception.getMessage());
    }

    @Test
    void addItem_InvalidQuantity() {
        when(shoppingListRepository.findAll()).thenReturn(Arrays.asList(shoppingList));

        Item newItem = new Item();
        newItem.setName("Milk");
        newItem.setQuantity(0);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            itemService.addItem(newItem);
        });

        assertEquals("Item quantity must be at least 1", exception.getMessage());
    }

    @Test
    void getAllItems_Success() {
        List<Item> items = Arrays.asList(item);
        shoppingList.setItems(items);
        when(shoppingListRepository.findAll()).thenReturn(Arrays.asList(shoppingList));

        List<Item> result = itemService.getAllItems();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Milk", result.get(0).getName());
    }

    @Test
    void getItemById_Success() {
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));

        Item result = itemService.getItemById(1L);

        assertNotNull(result);
        assertEquals("Milk", result.getName());
    }

    @Test
    void getItemById_ItemNotFound() {
        when(itemRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            itemService.getItemById(1L);
        });

        assertEquals("Item not found with id: 1", exception.getMessage());
    }

    @Test
    void updateItem_Success() {
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));
        when(itemRepository.save(any(Item.class))).thenReturn(item);

        Item updatedItem = new Item();
        updatedItem.setName("Whole Milk");
        updatedItem.setQuantity(3);
        updatedItem.setFavorited(true);
        updatedItem.setCategory(category);

        Item result = itemService.updateItem(1L, updatedItem);

        assertNotNull(result);
        assertEquals("Whole Milk", result.getName());
        assertEquals(3, result.getQuantity());
        assertTrue(result.isFavorited());
        verify(itemRepository, times(1)).save(item);
    }

    @Test
    void toggleFavorite_Success() {
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));
        when(itemRepository.save(any(Item.class))).thenReturn(item);

        Item result = itemService.toggleFavorite(1L);

        assertTrue(result.isFavorited());
        verify(itemRepository, times(1)).save(item);
    }

    @Test
    void toggleFavorite_FromTrueToFalse() {
        item.setFavorited(true);
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));
        when(itemRepository.save(any(Item.class))).thenReturn(item);

        Item result = itemService.toggleFavorite(1L);

        assertFalse(result.isFavorited());
        verify(itemRepository, times(1)).save(item);
    }

    @Test
    void deleteItem_Success() {
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));
        doNothing().when(itemRepository).delete(item);

        itemService.deleteItem(1L);

        verify(itemRepository, times(1)).delete(item);
    }

    @Test
    void deleteItem_ItemNotFound() {
        when(itemRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            itemService.deleteItem(1L);
        });

        assertEquals("Item not found with id: 1", exception.getMessage());
        verify(itemRepository, never()).delete(any(Item.class));
    }

    @Test
    void clearAllItems_Success() {
        doNothing().when(itemRepository).deleteAll();

        itemService.clearAllItems();

        verify(itemRepository, times(1)).deleteAll();
    }
}
