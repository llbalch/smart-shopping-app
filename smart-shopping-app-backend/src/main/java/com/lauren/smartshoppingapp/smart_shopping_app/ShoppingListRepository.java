package com.lauren.smartshoppingapp.smart_shopping_app;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ShoppingListRepository extends JpaRepository<ShoppingList, Long> {

    @Query("select distinct s from ShoppingList s left join fetch s.items i left join fetch i.category")
    List<ShoppingList> findAllWithItemsAndCategories();

}
