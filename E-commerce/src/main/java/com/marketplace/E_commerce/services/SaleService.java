package com.marketplace.E_commerce.services;

import com.marketplace.E_commerce.models.Sale;
import com.marketplace.E_commerce.repositories.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    public Sale saveSale(Sale sale) {
        // Ensure price is not null
        if (sale.getPrice() == null) {
            sale.setPrice(0.0);
        }
        if (sale.getQuantity() == null) {
            sale.setQuantity(1);
        }
        if (sale.getOrderStatus() == null) {
            sale.setOrderStatus("PENDING");
        }
        return saleRepository.save(sale);
    }
}