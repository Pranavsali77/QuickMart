package com.marketplace.E_commerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.marketplace.E_commerce.models.ContactMessage;
import com.marketplace.E_commerce.services.ContactMessageService;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactMessageController {

    @Autowired
    private ContactMessageService service;

    @PostMapping
    public ResponseEntity<ContactMessage> submit(@RequestBody ContactMessage message) {
        ContactMessage saved = service.saveMessage(message);
        return ResponseEntity.ok(saved);
    }
}
