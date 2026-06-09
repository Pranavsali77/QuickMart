package com.marketplace.E_commerce.controllers;

import com.marketplace.E_commerce.models.Announcement;
import com.marketplace.E_commerce.services.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins = "*")
public class AnnouncementController {

    @Autowired
    private AnnouncementService service;

    @PostMapping
    public Announcement create(@RequestBody Announcement announcement) {
        return service.save(announcement);
    }

    @GetMapping
    public List<Announcement> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
