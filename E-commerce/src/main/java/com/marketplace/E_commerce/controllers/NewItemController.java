package com.marketplace.E_commerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.marketplace.E_commerce.models.NewItem;
import com.marketplace.E_commerce.repositories.NewItemRepository;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class NewItemController {

    @Autowired
    private NewItemRepository itemRepository;

    private final String uploadDir = "uploads";

    // ✅ Add item with image upload
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addItem(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("image") MultipartFile image) {

        try {
            // Save the image
            String filename = StringUtils.cleanPath(image.getOriginalFilename());
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(filename);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Save the item
            NewItem item = new NewItem();
            item.setName(name);
            item.setDescription(description);
            item.setPrice(price);
            item.setImageName(filename); // stored in DB

            NewItem savedItem = itemRepository.save(item);
            return ResponseEntity.ok(savedItem);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image: " + e.getMessage());
        }
    }

    // ✅ Get all items with correct image URLs
    @GetMapping
    public ResponseEntity<List<NewItem>> getAllItems() {
        List<NewItem> items = itemRepository.findAll();

        for (NewItem item : items) {
            if (item.getImageName() != null && !item.getImageName().isEmpty()) {
                item.setImageUrl("http://localhost:8080/api/items/images/" + item.getImageName());
            } else {
                item.setImageUrl("http://localhost:4200/assets/default-image.png"); // Angular fallback
            }
        }

        return ResponseEntity.ok(items);
    }

    // ✅ Serve image file to frontend
    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            // ✅ Decode in case of %20 or other characters
            String decodedFilename = URLDecoder.decode(filename, StandardCharsets.UTF_8);
            
            Path filePath = Paths.get("uploads", decodedFilename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .contentType(Files.probeContentType(filePath) != null ?
                                     MediaType.parseMediaType(Files.probeContentType(filePath)) :
                                     MediaType.APPLICATION_OCTET_STREAM)
                        .body(resource);
            } else {
                System.out.println("❌ File not found or unreadable: " + decodedFilename);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ✅ Get item by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getItem(@PathVariable Long id) {
        Optional<NewItem> itemOpt = itemRepository.findById(id);
        if (itemOpt.isPresent()) {
            NewItem item = itemOpt.get();
            if (item.getImageName() != null && !item.getImageName().isEmpty()) {
                item.setImageUrl("http://localhost:8080/api/items/images/" + item.getImageName());
            } else {
                item.setImageUrl("http://localhost:4200/assets/default-image.png");
            }
            return ResponseEntity.ok(item);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
        }
    }

    // ✅ Delete item
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        if (itemRepository.existsById(id)) {
            itemRepository.deleteById(id);
            return ResponseEntity.ok("Item deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
        }
    }

    // ✅ Update item
    @PutMapping("/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody NewItem updatedItem) {
        Optional<NewItem> optionalItem = itemRepository.findById(id);
        if (optionalItem.isPresent()) {
            NewItem item = optionalItem.get();
            item.setName(updatedItem.getName());
            item.setDescription(updatedItem.getDescription());
            item.setPrice(updatedItem.getPrice());
            item.setImageName(updatedItem.getImageName());

            NewItem saved = itemRepository.save(item);
            return ResponseEntity.ok(saved);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
        }
    }
}
