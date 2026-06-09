package com.marketplace.E_commerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.marketplace.E_commerce.models.Sale;
import com.marketplace.E_commerce.repositories.SaleRepository;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:4200")
public class SaleController {

    @Autowired
    private SaleRepository saleRepository;

    // ✅ Get sales by buyer name (for users to see their orders)
    @GetMapping("/buyer/{buyerName}")
    public ResponseEntity<List<Sale>> getSalesByBuyer(@PathVariable String buyerName) {
        List<Sale> sales = saleRepository.findByBuyer(buyerName);
        return ResponseEntity.ok(sales);
    }

    // ✅ Get all sales (for admin)
    @GetMapping
    public ResponseEntity<List<Sale>> getAllSales() {
        List<Sale> sales = saleRepository.findAll();
        return ResponseEntity.ok(sales);
    }

    // ✅ Get sale by ID
    @GetMapping("/{id}")
    public ResponseEntity<Sale> getSaleById(@PathVariable Long id) {
        return saleRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Create new sale (when user places an order)
    @PostMapping
    public ResponseEntity<Sale> createSale(@RequestBody Sale sale) {
        System.out.println("=== Creating Order ===");
        System.out.println("Item Name: " + sale.getItemName());
        System.out.println("Buyer: " + sale.getBuyer());
        System.out.println("Price: " + sale.getPrice());
        System.out.println("Quantity: " + sale.getQuantity());
        System.out.println("Payment Method: " + sale.getPaymentMethod());
        System.out.println("Payment Platform: " + sale.getPaymentPlatform());
        
        sale.setOrderDate(new Date());
        sale.setOrderStatus("PENDING");
        sale.setDelivered(false);
        
        // Ensure price is not null
        if (sale.getPrice() == null) {
            sale.setPrice(0.0);
        }
        
        // Ensure quantity is not null
        if (sale.getQuantity() == null) {
            sale.setQuantity(1);
        }
        
        // Ensure payment method is not null
        if (sale.getPaymentMethod() == null || sale.getPaymentMethod().isEmpty()) {
            sale.setPaymentMethod("Online");
        }
        
        // Ensure payment platform is not null
        if (sale.getPaymentPlatform() == null) {
            sale.setPaymentPlatform("Online Payment");
        }
        
        Sale savedSale = saleRepository.save(sale);
        System.out.println("Saved Order - ID: " + savedSale.getId() + 
                          ", Price: " + savedSale.getPrice() +
                          ", Payment Method: " + savedSale.getPaymentMethod());
        return ResponseEntity.ok(savedSale);
    }
    
    // ✅ Update sale
    @PutMapping("/{id}")
    public ResponseEntity<Sale> updateSale(@PathVariable Long id, @RequestBody Sale sale) {
        sale.setId(id);
        return ResponseEntity.ok(saleRepository.save(sale));
    }
    
    // ✅ Update order status (SHIPPED/DELIVERED/CANCELLED)
    @PatchMapping("/admin/status/{id}")
    public ResponseEntity<Sale> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Sale sale = saleRepository.findById(id).orElse(null);
        if (sale != null) {
            String status = body.get("status");
            sale.setOrderStatus(status);
            
            if ("SHIPPED".equals(status)) {
                sale.setShippedDate(new Date());
                sale.setDelivered(false);
            } else if ("DELIVERED".equals(status)) {
                sale.setDelivered(true);
                sale.setDeliveredDate(new Date());
            } else if ("CANCELLED".equals(status)) {
                sale.setDelivered(false);
            }
            
            Sale updatedSale = saleRepository.save(sale);
            return ResponseEntity.ok(updatedSale);
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ Add tracking number
 // ✅ Add shipping details endpoint
    @PatchMapping("/admin/shipping/{id}")
    public ResponseEntity<Sale> updateShippingDetails(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Sale sale = saleRepository.findById(id).orElse(null);
        if (sale != null) {
            String courierName = body.get("courierName");
            String trackingNumber = body.get("trackingNumber");
            
            if (courierName != null) {
                sale.setCourierName(courierName);
            }
            if (trackingNumber != null) {
                sale.setTrackingNumber(trackingNumber);
            }
            
            Sale updatedSale = saleRepository.save(sale);
            return ResponseEntity.ok(updatedSale);
        }
        return ResponseEntity.notFound().build();
    }
    // ✅ Get orders by status (for admin filtering)
    @GetMapping("/admin/status/{status}")
    public ResponseEntity<List<Sale>> getOrdersByStatus(@PathVariable String status) {
        List<Sale> sales = saleRepository.findByOrderStatus(status);
        return ResponseEntity.ok(sales);
    }

    // ✅ Delete sale
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable Long id) {
        saleRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}