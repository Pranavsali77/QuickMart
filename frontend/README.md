<<<<<<< HEAD
# EcommerceOnlineMarketplace

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
=======
🛒 QuickMart

![Angular](https://img.shields.io/badge/Angular-17-red?logo=angular)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen?logo=springboot)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Java](https://img.shields.io/badge/Java-17-orange?logo=java)
![License](https://img.shields.io/badge/License-MIT-green)

📌 Project Overview

A full-stack e-commerce platform built with **Angular 17** (frontend) and **Spring Boot 3** (backend) with **MySQL** database. Features user authentication, product management, shopping cart, multiple payment methods (COD, UPI, Card), order tracking, and admin dashboard.


✨ Features

👤 User Features
| Feature | Description |
|---------|-------------|
| 🔐 Authentication | Login/Register with JWT |
| 🛍️ Products | Browse, search, filter products |
| 🔍 Details | View product details with images |
| 🛒 Cart | Add/remove items, update quantities |
| 💝 Wishlist | Save favorite products |
| 💳 Payments | COD, UPI (Google Pay, PhonePe, Paytm), Card |
| 📦 Orders | Track orders with timeline |
| ⭐ Reviews | Submit feedback & ratings |
| 👤 Profile | Update profile & change password |

👑 Admin Features
| Feature | Description |
|---------|-------------|
| 📊 Dashboard | Analytics for products, orders, revenue |
| ➕ Products | Add/Edit/Delete products |
| 📦 Orders | Manage order status (Pending → Confirmed → Shipped → Delivered) |
| 🚚 Shipping | Add courier name & tracking number |
| 📢 Announcements | Publish updates for users |
| 💬 Feedback | View customer feedback |


🛠️ Tech Stack

Frontend
- Angular 17
- TypeScript
- Angular Material
- RxJS
- CSS3

Backend
- Spring Boot 3
- Spring Data JPA
- MySQL
- Hibernate
- Maven

🚀 Installation

Prerequisites
- Node.js (v18+)
- Angular CLI (v17)
- Java 17+
- MySQL 8.0
- Maven

Backend Setup
```bash

Clone repository
git clone https://github.com/yourusername/ecommerce-marketplace.git
cd ecommerce-marketplace/backend

Configure MySQL
CREATE DATABASE marketplace_db;

Update application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/marketplace_db
spring.datasource.username=root
spring.datasource.password=yourpassword

Run backend
mvn clean install
mvn spring-boot:run
Backend runs on: http://localhost:8080

Frontend Setup
bash
cd ../frontend

Install dependencies
npm install

Run angular app
ng serve
# Frontend runs on: http://localhost:4200

🔗 API Endpoints
Products
Method	Endpoint	Description
GET	/api/user/items	Get all products
GET	/api/user/items/{id}	Get product by ID
POST	/api/admin/products/add	Add product
PUT	/api/admin/products/{id}	Update product
DELETE	/api/admin/products/{id}	Delete product
Orders
Method	Endpoint	Description
GET	/api/sales	Get all orders
GET	/api/sales/buyer/{buyer}	Get user orders
POST	/api/sales	Create order
PATCH	/api/sales/admin/status/{id}	Update status
PATCH	/api/sales/admin/shipping/{id}	Add shipping

🎯 Workflow
User Flow
text
Login → Browse Products → Add to Cart → Checkout → 
Enter Address → Select Payment → Place Order → Track Order → Receive Delivery
Admin Flow
text
Login → Dashboard → Manage Products → Confirm Orders → 
Add Shipping Details → Mark Shipped → Mark Delivered
Order Status Flow
text
PENDING → CONFIRMED → SHIPPED → DELIVERED
🧪 Test Credentials
Admin Access
Email: admin@example.com

Password: admin123

User Access
Email: user@example.com

Password: user123

📁 Project Structure
text
ecommerce-marketplace/
├── frontend/
│   ├── src/app/
│   │   ├── components/navbar/
│   │   ├── models/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── add-product/
│   │   │   │   ├── admin-home/
│   │   │   │   ├── announcement/
│   │   │   │   ├── feedback/
│   │   │   │   └── sales/
│   │   │   └── user/
│   │   │       ├── my-cart/
│   │   │       ├── my-orders/
│   │   │       ├── my-profile/
│   │   │       ├── payment/
│   │   │       └── user-item/
│   │   └── services/
│   └── package.json
├── backend/
│   ├── src/main/java/
│   │   └── com/cca/marketplace/
│   │       ├── controllers/
│   │       ├── models/
│   │       ├── repositories/
│   │       └── services/
│   └── pom.xml
└── database/
    └── schema.sql

🤝 Contributing
Fork the repository

Create feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open Pull Request

📄 License
Distributed under the MIT License. See LICENSE file for more information.

🙏 Acknowledgments
Angular Material for UI components

Spring Boot team

MySQL database

All contributors

⭐ Star This Repository
If you found this project helpful, please give it a star on GitHub!

>>>>>>> 4a7e4f6ce80ff1293f358fa182cd028a83d091de
