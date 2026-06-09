package com.marketplace.E_commerce.services;

import com.marketplace.E_commerce.models.NewItem;
import com.marketplace.E_commerce.repositories.NewItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserItemService {

    @Autowired
    private NewItemRepository itemRepository;

    // Get all available items
    public List<NewItem> getAllItems() {
        return itemRepository.findAll();
    }

    // Get item by ID
    public Optional<NewItem> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    // Simulate "Buy" operation
    public String buyItem(Long id) {
        Optional<NewItem> item = itemRepository.findById(id);
        return item.isPresent()
                ? "Item with ID " + id + " purchased successfully."
                : "Item not found.";
    }
}
