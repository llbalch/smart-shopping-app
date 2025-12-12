package com.lauren.smartshoppingapp.smart_shopping_app;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ItemController.class)
@AutoConfigureMockMvc(addFilters = false)
class ItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ItemService itemService;

    private Item item;
    private Category category;

    @BeforeEach
    void setUp() {
        category = new Category();
        category.setId(1L);
        category.setName("Groceries");

        item = new Item();
        item.setId(1L);
        item.setName("Milk");
        item.setQuantity(2);
        item.setFavorited(false);
        item.setCategory(category);
    }

    @Test
    void addItem_Success() throws Exception {
        when(itemService.addItem(any(Item.class))).thenReturn(item);

        mockMvc.perform(post("/api/items")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(item)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Milk"))
                .andExpect(jsonPath("$.quantity").value(2))
                .andExpect(jsonPath("$.favorited").value(false));

        verify(itemService, times(1)).addItem(any(Item.class));
    }

    @Test
    void getItems_Success() throws Exception {
        Item item2 = new Item();
        item2.setId(2L);
        item2.setName("Bread");
        item2.setQuantity(1);
        item2.setFavorited(true);
        item2.setCategory(category);

        List<Item> items = Arrays.asList(item, item2);
        when(itemService.getAllItems()).thenReturn(items);

        mockMvc.perform(get("/api/items"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Milk"))
                .andExpect(jsonPath("$[1].name").value("Bread"));

        verify(itemService, times(1)).getAllItems();
    }

    @Test
    void getItem_Success() throws Exception {
        when(itemService.getItemById(1L)).thenReturn(item);

        mockMvc.perform(get("/api/items/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Milk"))
                .andExpect(jsonPath("$.quantity").value(2));

        verify(itemService, times(1)).getItemById(1L);
    }

    @Test
    void updateItem_Success() throws Exception {
        Item updatedItem = new Item();
        updatedItem.setId(1L);
        updatedItem.setName("Whole Milk");
        updatedItem.setQuantity(3);
        updatedItem.setFavorited(true);
        updatedItem.setCategory(category);

        when(itemService.updateItem(eq(1L), any(Item.class))).thenReturn(updatedItem);

        mockMvc.perform(put("/api/items/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedItem)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Whole Milk"))
                .andExpect(jsonPath("$.quantity").value(3))
                .andExpect(jsonPath("$.favorited").value(true));

        verify(itemService, times(1)).updateItem(eq(1L), any(Item.class));
    }

    @Test
    void toggleFavorite_Success() throws Exception {
        Item favoritedItem = new Item();
        favoritedItem.setId(1L);
        favoritedItem.setName("Milk");
        favoritedItem.setQuantity(2);
        favoritedItem.setFavorited(true);
        favoritedItem.setCategory(category);

        when(itemService.toggleFavorite(1L)).thenReturn(favoritedItem);

        mockMvc.perform(patch("/api/items/1/favorite"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.favorited").value(true));

        verify(itemService, times(1)).toggleFavorite(1L);
    }

    @Test
    void deleteItem_Success() throws Exception {
        doNothing().when(itemService).deleteItem(1L);

        mockMvc.perform(delete("/api/items/1"))
                .andExpect(status().isNoContent());

        verify(itemService, times(1)).deleteItem(1L);
    }

    @Test
    void clearAllItems_Success() throws Exception {
        doNothing().when(itemService).clearAllItems();

        mockMvc.perform(delete("/api/items"))
                .andExpect(status().isNoContent());

        verify(itemService, times(1)).clearAllItems();
    }

    @Test
    void addItem_InvalidItem_BadRequest() throws Exception {
        when(itemService.addItem(any(Item.class)))
                .thenThrow(new IllegalArgumentException("Item name cannot be empty"));

        Item invalidItem = new Item();
        invalidItem.setName("");
        invalidItem.setQuantity(1);

        mockMvc.perform(post("/api/items")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidItem)))
                .andExpect(status().is4xxClientError());
    }

    @Test
    void getItem_NotFound() throws Exception {
        when(itemService.getItemById(999L))
                .thenThrow(new RuntimeException("Item not found with id: 999"));

        mockMvc.perform(get("/api/items/999"))
                .andExpect(status().isNotFound());

        verify(itemService, times(1)).getItemById(999L);
    }
}
