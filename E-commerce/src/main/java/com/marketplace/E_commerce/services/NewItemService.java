package com.marketplace.E_commerce.services;

import com.marketplace.E_commerce.models.NewItem;
import com.marketplace.E_commerce.repositories.NewItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewItemService {

    @Autowired
    private NewItemRepository itemRepository;

    public NewItem addItem(NewItem item) {
        return itemRepository.save(item);
    }

    public List<NewItem> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<NewItem> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

    public NewItem updateItem(NewItem item) {
        return itemRepository.save(item);
    }
}
