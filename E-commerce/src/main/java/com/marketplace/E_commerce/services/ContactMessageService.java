package com.marketplace.E_commerce.services;

import com.marketplace.E_commerce.models.ContactMessage;
import com.marketplace.E_commerce.repositories.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactMessageService {

    @Autowired
    private ContactMessageRepository repository;

    public ContactMessage saveMessage(ContactMessage message) {
        return repository.save(message);
    }
}
