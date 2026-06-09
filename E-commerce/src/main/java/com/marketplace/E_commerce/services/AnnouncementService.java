package com.marketplace.E_commerce.services;

import com.marketplace.E_commerce.models.Announcement;
import com.marketplace.E_commerce.repositories.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {
    @Autowired
    private AnnouncementRepository repo;

    public Announcement save(Announcement announcement) {
        return repo.save(announcement);
    }

    public List<Announcement> getAll() {
        return repo.findAll();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
