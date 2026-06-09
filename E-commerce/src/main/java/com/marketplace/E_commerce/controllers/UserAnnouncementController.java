package com.marketplace.E_commerce.controllers;

import com.marketplace.E_commerce.models.Announcement;
import com.marketplace.E_commerce.services.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/announcements")
@CrossOrigin(origins = "*")
public class UserAnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    // GET: View all announcements (for users)
    @GetMapping
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        List<Announcement> announcements = announcementService.getAll();
        return ResponseEntity.ok(announcements);
    }
}
