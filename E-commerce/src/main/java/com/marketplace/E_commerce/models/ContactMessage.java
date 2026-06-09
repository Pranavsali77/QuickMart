package com.marketplace.E_commerce.models;

import jakarta.persistence.*;

@Entity

public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String message;
}
