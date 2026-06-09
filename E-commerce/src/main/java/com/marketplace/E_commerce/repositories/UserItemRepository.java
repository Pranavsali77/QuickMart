package com.marketplace.E_commerce.repositories;

import com.marketplace.E_commerce.models.NewItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserItemRepository extends JpaRepository<NewItem, Long> {
    // same as NewItemRepository
}
