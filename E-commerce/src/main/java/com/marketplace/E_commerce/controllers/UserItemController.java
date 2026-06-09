package com.marketplace.E_commerce.controllers;

import com.marketplace.E_commerce.models.NewItem;
import com.marketplace.E_commerce.models.Sale;
import com.marketplace.E_commerce.repositories.NewItemRepository;
import com.marketplace.E_commerce.services.SaleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user/items")
@CrossOrigin(origins = "*")
public class UserItemController {

    @Autowired
    private SaleService saleService;

    @Autowired
    private NewItemRepository itemRepository;

    private static final String IMAGE_BASE_URL =
            "http://localhost:8080/api/user/items/images/";

    private final Path uploadDir = Paths.get("uploads");

    // ✅ Get all items for user with correct image URLs
    @GetMapping
    public ResponseEntity<List<NewItem>> getAllItemsForUser() {

        List<NewItem> itemsWithUrls =
                itemRepository.findAll().stream()
                        .map(item -> {

                            if (item.getImageName() != null
                                    && !item.getImageName().isEmpty()) {

                                item.setImageUrl(
                                        IMAGE_BASE_URL + item.getImageName());

                            } else {

                                item.setImageUrl(
                                        "http://localhost:4200/assets/default-image.png");
                            }

                            return item;
                        })
                        .collect(Collectors.toList());

        return ResponseEntity.ok(itemsWithUrls);
    }

    // ✅ Get item by ID with image URL
    @GetMapping("/{id}")
    public ResponseEntity<?> getItemDetails(@PathVariable Long id) {

        Optional<NewItem> optionalItem =
                itemRepository.findById(id);

        if (optionalItem.isPresent()) {

            NewItem item = optionalItem.get();

            if (item.getImageName() != null
                    && !item.getImageName().isEmpty()) {

                item.setImageUrl(
                        IMAGE_BASE_URL + item.getImageName());

            } else {

                item.setImageUrl(
                        "http://localhost:4200/assets/default-image.png");
            }

            return ResponseEntity.ok(item);

        } else {

            return ResponseEntity.status(404)
                    .body("Item not found");
        }
    }

    // ✅ Handle payment and record in Sale table
    @PostMapping("/pay/{id}")
    public ResponseEntity<?> payForItem(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        try {

            Optional<NewItem> itemOptional =
                    itemRepository.findById(id);

            if (itemOptional.isPresent()) {

                NewItem item = itemOptional.get();

                String buyer =
                        request.getOrDefault("buyer", "Guest");

                int quantity =
                        Integer.parseInt(
                                request.getOrDefault("quantity", "1"));

                Sale sale = new Sale();

                sale.setItemName(item.getName());
                sale.setBuyer(buyer);
                sale.setDelivered(false);
                sale.setOrderStatus("PENDING");
                sale.setPrice(item.getPrice());
                sale.setQuantity(quantity);
                sale.setOrderDate(new Date());

                Sale savedSale =
                        saleService.saveSale(sale);

                Map<String, Object> response =
                        new HashMap<>();

                response.put(
                        "message",
                        "Payment successful for item: "
                                + item.getName());

                response.put(
                        "orderId",
                        savedSale.getId());

                response.put(
                        "status",
                        "SUCCESS");

                return ResponseEntity.ok(response);

            } else {

                Map<String, Object> errorResponse =
                        new HashMap<>();

                errorResponse.put(
                        "message",
                        "Item not found");

                errorResponse.put(
                        "status",
                        "ERROR");

                return ResponseEntity.status(404)
                        .body(errorResponse);
            }

        } catch (Exception e) {

            e.printStackTrace();

            Map<String, Object> errorResponse =
                    new HashMap<>();

            errorResponse.put(
                    "message",
                    "Payment failed: " + e.getMessage());

            errorResponse.put(
                    "status",
                    "ERROR");

            return ResponseEntity.status(500)
                    .body(errorResponse);
        }
    }

    // ✅ Serve image files from uploads folder
    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> serveImage(
            @PathVariable String filename) {

        try {

            Path file =
                    uploadDir.resolve(filename).normalize();

            Resource resource =
                    new UrlResource(file.toUri());

            if (!resource.exists()
                    || !resource.isReadable()) {

                System.out.println(
                        "❌ File not found: " + filename);

                return ResponseEntity.notFound().build();
            }

            String contentType =
                    Files.probeContentType(file);

            if (contentType == null) {

                contentType =
                        "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(
                            MediaType.parseMediaType(contentType))
                    .body(resource);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError()
                    .body(null);
        }
    }
}