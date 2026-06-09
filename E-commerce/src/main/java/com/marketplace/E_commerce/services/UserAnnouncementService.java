package com.marketplace.E_commerce.services;

import com.marketplace.E_commerce.models.Announcement;
import com.marketplace.E_commerce.repositories.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    // Fetch all announcements (or filter active if needed)
    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }
}
