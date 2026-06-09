package com.marketplace.E_commerce.repositories;

import com.marketplace.E_commerce.models.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findByBuyer(String buyer);
    List<Sale> findByOrderStatus(String status);
    List<Sale> findByDelivered(boolean delivered);
    List<Sale> findByPaymentMethod(String paymentMethod);
}