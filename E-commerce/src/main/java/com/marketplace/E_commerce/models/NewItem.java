package com.marketplace.E_commerce.models;

import jakarta.persistence.*;

@Entity
@Table(name = "new_item")
public class NewItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;

    private String imageName;

    @Transient  // ✅ Not stored in DB, but used for response
    private String imageUrl;

    public NewItem() {}

    public NewItem(String name, String description, double price, String imageName) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageName = imageName;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getImageName() { return imageName; }
    public void setImageName(String imageName) { this.imageName = imageName; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
