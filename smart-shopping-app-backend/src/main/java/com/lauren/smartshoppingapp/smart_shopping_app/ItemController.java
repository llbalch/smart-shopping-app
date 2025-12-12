package com.lauren.smartshoppingapp.smart_shopping_app;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Item addItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    @GetMapping
    public List<Item> getItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{itemId}")
    public Item getItem(@PathVariable Long itemId) {
        return itemService.getItemById(itemId);
    }

    @PutMapping("/{itemId}")
    public Item updateItem(@PathVariable Long itemId, @RequestBody Item item) {
        return itemService.updateItem(itemId, item);
    }

    @PatchMapping("/{itemId}/favorite")
    public Item toggleFavorite(@PathVariable Long itemId) {
        return itemService.toggleFavorite(itemId);
    }

    @DeleteMapping("/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(@PathVariable Long itemId) {
        itemService.deleteItem(itemId);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clearAllItems() {
        itemService.clearAllItems();
    }
}
