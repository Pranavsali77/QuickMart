<div align="center">

# 🛍️ **QuickMart** - Enterprise E-Commerce Platform

### *"Making Online Shopping Quick & Easy"*

![Angular](https://img.shields.io/badge/Angular-17-red?logo=angular&style=flat-square)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen?logo=springboot&style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=flat-square)
![Java](https://img.shields.io/badge/Java-17-orange?logo=java&style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

</div>

---

## 📌 **Table of Contents**

| Section | Description |
|---------|-------------|
| [About QuickMart](#-about-quickmart) | Project overview and mission |
| [Key Features](#-key-features) | User and admin features |
| [Technology Stack](#-technology-stack) | Frontend and backend technologies |
| [Installation Guide](#-installation-guide) | Step by step setup |
| [API Endpoints](#-api-endpoints) | REST API documentation |
| [User Workflow](#-user-workflow) | Customer and admin journeys |
| [Testing Credentials](#-testing-credentials) | Test accounts |
| [Project Structure](#-project-structure) | Folder organization |
| [Troubleshooting](#-troubleshooting-guide) | Common issues and solutions |
| [Future Roadmap](#-future-roadmap) | Upcoming features |
| [Contributing](#-contributing-guidelines) | How to contribute |
| [License](#-license) | MIT License |
| [Contact](#-contact) | Support and inquiries |

---

## 📌 **About QuickMart**

**QuickMart** is a complete full-stack e-commerce platform that connects buyers and sellers through an intuitive, feature-rich online marketplace. Built with **Angular 17** for dynamic frontend experiences and **Spring Boot 3** for robust backend APIs, QuickMart delivers a seamless shopping experience with powerful administrative controls.

### 🎯 **Mission**

> *"To provide a reliable, secure, and user-friendly e-commerce solution that empowers customers to shop conveniently while giving administrators complete control over their online store."*

---

## ✨ **Key Features**

### 👤 **Customer Features**

| Icon | Feature | Description |
|:----:|---------|-------------|
| 🔐 | **Authentication** | Secure JWT-based login and registration |
| 🛍️ | **Product Catalog** | Browse with search, filters, and sorting |
| 🔍 | **Product Details** | High-quality images and detailed info |
| 🛒 | **Shopping Cart** | Add/remove items, update quantities |
| 💝 | **Wishlist** | Save favorite products |
| 💳 | **Multiple Payments** | COD, UPI, Credit/Debit cards |
| 📦 | **Order Tracking** | Real-time tracking with timeline |
| ⭐ | **Reviews & Ratings** | Submit feedback and rate products |
| 👤 | **Profile Management** | Update personal information |
| 📱 | **Responsive Design** | Works on all devices |

### 👑 **Administrator Features**

| Icon | Feature | Description |
|:----:|---------|-------------|
| 📊 | **Analytics Dashboard** | Real-time statistics and insights |
| ➕ | **Product Management** | Complete CRUD operations |
| 📦 | **Order Management** | Full order lifecycle management |
| 🚚 | **Shipping Integration** | Add courier and tracking details |
| 📢 | **Announcements** | Publish updates for customers |
| 💬 | **Feedback Management** | View and respond to feedback |
| 👥 | **User Management** | Manage registered users |

---

## 📦 **Order Status Workflow**
┌─────────────────────────────────────────────────────────────────┐
│ │
│ 📝 PENDING ──→ ✅ CONFIRMED ──→ 🚚 SHIPPED ──→ 🎉 DELIVERED │
│ │ │ │
│ ↓ ↓ │
│ ❌ CANCELLED ❌ CANCELLED │
│ │
└─────────────────────────────────────────────────────────────────┘

text

---

## 💳 **Payment Methods Supported**

| Icon | Method | Status |
|:----:|--------|:------:|
| 💰 | Cash on Delivery | ✅ Available |
| 📱 | UPI (Google Pay, PhonePe, Paytm, BHIM) | ✅ Available |
| 💳 | Credit/Debit Card (Visa, Mastercard, RuPay) | ✅ Available |
| 🏦 | Net Banking | 🔜 Coming Soon |

---

## 🛠️ **Technology Stack**

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 17.x | Frontend framework |
| TypeScript | 5.x | Programming language |
| Angular Material | 17.x | UI components |
| RxJS | 7.x | State management |
| CSS3 | - | Styling & animations |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Spring Boot | 3.2.x | REST API framework |
| Spring Data JPA | 3.2.x | Database operations |
| MySQL | 8.0 | Relational database |
| Hibernate | 6.x | ORM mapping |
| Maven | 3.9+ | Dependency management |

---

## 🚀 **Installation Guide**

### 📋 **Prerequisites**

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | v18 or higher | Angular runtime |
| Angular CLI | v17 | Angular CLI tool |
| Java JDK | 17+ | Spring Boot runtime |
| MySQL | 8.0+ | Database |
| Maven | 3.9+ | Build tool |

---

### 📥 **Step 1: Clone Repository**

```bash
git clone https://github.com/yourusername/quickmart.git
cd quickmart
⚙️ Step 2: Backend Setup
bash
# Navigate to backend
cd backend

# Create database
mysql -u root -p
CREATE DATABASE quickmart_db;
EXIT;
📝 Configure application.properties:

properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/quickmart_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# CORS
spring.web.cors.allowed-origins=http://localhost:4200
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,PATCH,OPTIONS
bash
# Build and run
mvn clean install
mvn spring-boot:run
✅ Backend: http://localhost:8080

🎨 Step 3: Frontend Setup
bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Run application
ng serve -o
✅ Frontend: http://localhost:4200
```

## 🔗 API Endpoints

### 🔐 Authentication

| Method | Endpoint             | Description       | Access |
| ------ | -------------------- | ----------------- | ------ |
| POST   | `/api/auth/register` | User Registration | Public |
| POST   | `/api/auth/login`    | User Login        | Public |
| GET    | `/api/auth/all`      | Get All Users     | Admin  |
| DELETE | `/api/auth/{id}`     | Delete User       | Admin  |

---

### 📦 Products

| Method | Endpoint                   | Description       | Access |
| ------ | -------------------------- | ----------------- | ------ |
| GET    | `/api/user/items`          | Get All Products  | Public |
| GET    | `/api/user/items/{id}`     | Get Product By ID | Public |
| POST   | `/api/admin/products/add`  | Add Product       | Admin  |
| PUT    | `/api/admin/products/{id}` | Update Product    | Admin  |
| DELETE | `/api/admin/products/{id}` | Delete Product    | Admin  |

---

### 📋 Orders

| Method | Endpoint                         | Description          | Access |
| ------ | -------------------------------- | -------------------- | ------ |
| GET    | `/api/sales`                     | Get All Orders       | Admin  |
| GET    | `/api/sales/buyer/{buyer}`       | Get User Orders      | User   |
| POST   | `/api/sales`                     | Create Order         | User   |
| PATCH  | `/api/sales/admin/status/{id}`   | Update Order Status  | Admin  |
| PATCH  | `/api/sales/admin/shipping/{id}` | Add Shipping Details | Admin  |

---

### 📢 Announcements

| Method | Endpoint                        | Description           | Access |
| ------ | ------------------------------- | --------------------- | ------ |
| GET    | `/api/announcements`            | Get All Announcements | Public |
| POST   | `/api/admin/announcements`      | Create Announcement   | Admin  |
| DELETE | `/api/admin/announcements/{id}` | Delete Announcement   | Admin  |

---

### 💬 Feedback

| Method | Endpoint                   | Description      | Access |
| ------ | -------------------------- | ---------------- | ------ |
| GET    | `/api/feedback`            | Get All Feedback | Admin  |
| POST   | `/api/feedback`            | Submit Feedback  | User   |
| DELETE | `/api/admin/feedback/{id}` | Delete Feedback  | Admin  |

---

# 🎯 User Workflow

## 👤 Customer Journey

| Step | Action                                 |
| ---- | -------------------------------------- |
| 1    | Register / Login                       |
| 2    | Browse Products (Search, Filter, Sort) |
| 3    | View Product Details                   |
| 4    | Add to Cart                            |
| 5    | Add to Wishlist (Optional)             |
| 6    | Proceed to Checkout                    |
| 7    | Enter Shipping Address                 |
| 8    | Select Payment Method                  |
| 9    | Place Order                            |
| 10   | Track Order Status                     |
| 11   | Receive Updates                        |
| 12   | Submit Feedback                        |

---

## 👑 Admin Journey

| Step | Action                         |
| ---- | ------------------------------ |
| 1    | Login with Admin Credentials   |
| 2    | View Dashboard Analytics       |
| 3    | Manage Products (CRUD)         |
| 4    | Process Incoming Orders        |
| 5    | Confirm Pending Orders         |
| 6    | Add Courier & Tracking Details |
| 7    | Mark Orders as Shipped         |
| 8    | Mark Orders as Delivered       |
| 9    | Publish Announcements          |
| 10   | Review Customer Feedback       |

---

# 🧪 Testing Credentials

## 👑 Administrator

| Field       | Value                                             |
| ----------- | ------------------------------------------------- |
| 📧 Email    | [admin@quickmart.com](mailto:admin@quickmart.com) |
| 🔑 Password | admin123                                          |

---

## 👤 Customer

| Field       | Value                                                   |
| ----------- | ------------------------------------------------------- |
| 📧 Email    | [customer@quickmart.com](mailto:customer@quickmart.com) |
| 🔑 Password | customer123                                             |

---

## 💳 Test Payment

| Method      | Credentials         |
| ----------- | ------------------- |
| UPI         | test@okhdfcbank     |
| Card Number | 4111 1111 1111 1111 |
| Expiry      | 12/25               |
| CVV         | 123                 |

---

# 📁 Project Structure

```text
quickmart/
│
├── frontend/                         # Angular App
│   ├── src/app/
│   │   ├── components/               # Reusable Components
│   │   ├── models/                   # Data Interfaces
│   │   ├── pages/
│   │   │   ├── admin/                # Admin Modules
│   │   │   └── user/                 # User Modules
│   │   └── services/                 # API Services
│   └── package.json
│
├── backend/                          # Spring Boot Application
│   ├── src/main/java/
│   │   └── com/marketplace/E_commerce/
│   │       ├── controllers/          # REST Controllers
│   │       ├── models/               # Entity Classes
│   │       ├── repositories/         # Database Operations
│   │       └── services/             # Business Logic
│   └── pom.xml
│
└── database/
    └── schema.sql
```

---

# 🐛 Troubleshooting Guide

| Problem                       | Solution                                              |
| ----------------------------- | ----------------------------------------------------- |
| 🌐 CORS Error                 | Add `@CrossOrigin(origins = "http://localhost:4200")` |
| 🔌 Database Connection Failed | Verify MySQL Service Is Running                       |
| 🖼️ Images Not Loading        | Check `uploads/` Directory                            |
| 🔐 Login Failed               | Clear Browser Local Storage                           |
| 🔌 Port Already In Use        | Change `server.port`                                  |
| 📦 npm Installation Errors    | Delete `node_modules` and Reinstall                   |

---

# 🛠️ Debug Commands

```bash
# Check Backend Health
curl http://localhost:8080/actuator/health

# Check Database
mysql -u root -p -e "SELECT 1"

# Check Port (Windows)
netstat -an | findstr :8080

# Check Port (Linux/Mac)
lsof -i :8080

# Clear Angular Cache
rm -rf node_modules/.cache
npm cache clean --force
```

---

# 🗓️ Future Roadmap

| Feature                   | Status     |
| ------------------------- | ---------- |
| 📧 Email Notifications    | 🔜 Planned |
| 📱 SMS Alerts             | 🔜 Planned |
| 🌐 Multi-language Support | 🔜 Planned |
| 📸 Review Images          | 🔜 Planned |
| 🏷️ Discount Coupons      | 🔜 Planned |
| 📄 PDF Invoices           | 🔜 Planned |
| 🔗 Social Login           | 🔜 Planned |
| 🤖 AI Recommendations     | 🔜 Planned |
| 💬 Live Chat Support      | 🔜 Planned |

---

# 🤝 Contributing Guidelines

| Step | Action                  |
| ---- | ----------------------- |
| 1    | Fork the Repository     |
| 2    | Create a Feature Branch |
| 3    | Commit Your Changes     |
| 4    | Push Changes to GitHub  |
| 5    | Open a Pull Request     |

---

# 📋 Coding Standards

* ✅ Follow Angular Style Guide
* ✅ Write Meaningful Commit Messages
* ✅ Add Comments for Complex Logic
* ✅ Test Before Submitting
* ✅ Update Documentation

---

# 📄 License

```text
MIT License

Copyright (c) 2026 QuickMart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

# 🙏 Acknowledgments

| Contributor                 |
| --------------------------- |
| 🅰️ Angular Team            |
| ☕ Spring Boot Team          |
| 🐬 MySQL Team               |
| 🎨 Angular Material         |
| 👥 Open Source Contributors |

---

# ⭐ Show Your Support

| Action               | Icon |
| -------------------- | ---- |
| Star This Repository | ⭐    |
| Fork This Repository | 🍴   |
| Share With Others    | 📢   |
| Report Issues        | 🐛   |
| Suggest Features     | 💡   |


---

<div align="center">

# 🎉 Final Note

### "QuickMart – Making Online Shopping Quick & Easy"

Built with ❤️ by **Pranav Sali**

© 2026 QuickMart. All Rights Reserved.

⭐ **Star this repository if you like this project!** ⭐

</div>
