package com.marketplace.E_commerce.repositories;

import com.marketplace.E_commerce.models.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
