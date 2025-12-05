package com.lauren.smartshoppingapp.smart_shopping_app;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/shopping-lists")
@CrossOrigin(origins = "http://localhost:5173")
public class ShoppingListController {

    private final ShoppingListService shoppingListService;

    public ShoppingListController(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;
    }

    @PostMapping
    public ShoppingList create(@RequestBody ShoppingList shoppingList) {
        return shoppingListService.createShoppingList(shoppingList);
    }

    @PutMapping
    public ShoppingList update(@RequestBody ShoppingList updatedList) {
        return shoppingListService.updateShoppingList(updatedList);
    }

    @DeleteMapping
    public void delete() {
        shoppingListService.deleteShoppingList();
    }
}
