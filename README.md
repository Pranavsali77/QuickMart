<div align="center">

# 🛍️ QuickMart - E-Commerce Platform

![Angular](https://img.shields.io/badge/Angular-17-red?logo=angular&style=for-the-badge)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen?logo=springboot&style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=for-the-badge)
![Java](https://img.shields.io/badge/Java-17-orange?logo=java&style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

## 📌 Table of Contents

- [About QuickMart](#-about-quickmart)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Installation Guide](#-installation-guide)
- [User Workflow](#-user-workflow)
- [API Endpoints](#-api-endpoints)
- [Testing Credentials](#-testing-credentials)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 📌 About QuickMart

QuickMart is a complete full-stack e-commerce platform that connects buyers and sellers through an intuitive, feature-rich online marketplace. Built with **Angular 17** for dynamic frontend experiences and **Spring Boot 3** for robust backend APIs, QuickMart delivers a seamless shopping experience with powerful administrative controls.

### 🎯 Mission

> *"To provide a reliable, secure, and user-friendly e-commerce solution that empowers customers to shop conveniently while giving administrators complete control over their online store."*

---

## ✨ Key Features

### 👤 Customer Features

| Icon | Feature | Description |
|:----:|---------|-------------|
| 🔐 | **Authentication** | Secure JWT-based login and registration system |
| 🛍️ | **Product Catalog** | Browse products with advanced search, filters, and sorting |
| 🔍 | **Product Details** | View detailed product information with high-quality images |
| 🛒 | **Shopping Cart** | Add/remove items, update quantities, real-time price calculation |
| 💝 | **Wishlist** | Save favorite products for future purchase |
| 💳 | **Multiple Payments** | Support for COD, UPI (Google Pay, PhonePe, Paytm, BHIM), and Credit/Debit cards |
| 📦 | **Order Tracking** | Real-time order tracking with visual timeline |
| ⭐ | **Reviews & Ratings** | Submit feedback and rate purchased products |
| 👤 | **Profile Management** | Update personal information and change password |
| 📱 | **Responsive Design** | Fully responsive UI works on all devices |

### 👑 Administrator Features

| Icon | Feature | Description |
|:----:|---------|-------------|
| 📊 | **Analytics Dashboard** | Real-time statistics on products, orders, revenue, and users |
| ➕ | **Product Management** | Complete CRUD operations for products |
| 📦 | **Order Management** | Full order lifecycle management from pending to delivered |
| 🚚 | **Shipping Integration** | Add courier name and tracking numbers for orders |
| 📢 | **Announcements** | Publish updates and alerts for customers |
| 💬 | **Feedback Management** | View and respond to customer feedback |
| 👥 | **User Management** | Manage registered users and their permissions |

---

## 📦 Order Status Workflow
┌─────────────────────────────────────────────────────────────────────────┐
│ │
│ 📝 PENDING ──→ ✅ CONFIRMED ──→ 🚚 SHIPPED ──→ 🎉 DELIVERED │
│ │ │ │
│ ↓ ↓ │
│ ❌ CANCELLED ❌ CANCELLED │
│ │
└─────────────────────────────────────────────────────────────────────────┘

text

---

## 💳 Payment Methods Supported

| Icon | Method | Status |
|:----:|--------|:------:|
| 💰 | Cash on Delivery | ✅ Available |
| 📱 | UPI (Google Pay, PhonePe, Paytm, BHIM) | ✅ Available |
| 💳 | Credit/Debit Card (Visa, Mastercard, RuPay) | ✅ Available |
| 🏦 | Net Banking | 🔜 Coming Soon |

---

## 🛠️ Technology Stack

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

## 🚀 Installation Guide

### 📋 Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | v18 or higher | Angular runtime |
| Angular CLI | v17 | Angular CLI tool |
| Java JDK | 17+ | Spring Boot runtime |
| MySQL | 8.0+ | Database |
| Maven | 3.9+ | Build tool |

### 📥 Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/quickmart.git
cd quickmart
⚙️ Step 2: Backend Setup
bash
# Navigate to backend directory
cd backend

# Create MySQL database
mysql -u root -p
CREATE DATABASE quickmart_db;
EXIT;

# Configure database in application.properties
# Edit: src/main/resources/application.properties
application.properties:

properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/quickmart_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:4200
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,PATCH,OPTIONS
bash
# Build and run backend
mvn clean install
mvn spring-boot:run
🚀 Backend runs at: http://localhost:8080

🎨 Step 3: Frontend Setup
bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Run Angular application
ng serve -o
🚀 Frontend runs at: http://localhost:4200

🔗 API Endpoints
Authentication Endpoints
Method	Endpoint	Description	Access
POST	/api/auth/register	User registration	Public
POST	/api/auth/login	User login	Public
GET	/api/auth/all	Get all users	Admin
DELETE	/api/auth/{id}	Delete user	Admin
Product Endpoints
Method	Endpoint	Description	Access
GET	/api/user/items	Get all products	Public
GET	/api/user/items/{id}	Get product by ID	Public
POST	/api/admin/products/add	Add product	Admin
PUT	/api/admin/products/{id}	Update product	Admin
DELETE	/api/admin/products/{id}	Delete product	Admin
Order (Sale) Endpoints
Method	Endpoint	Description	Access
GET	/api/sales	Get all orders	Admin
GET	/api/sales/buyer/{buyer}	Get user orders	User
POST	/api/sales	Create order	User
PATCH	/api/sales/admin/status/{id}	Update order status	Admin
PATCH	/api/sales/admin/shipping/{id}	Add shipping details	Admin
Announcement Endpoints
Method	Endpoint	Description	Access
GET	/api/announcements	Get all announcements	Public
POST	/api/admin/announcements	Create announcement	Admin
DELETE	/api/admin/announcements/{id}	Delete announcement	Admin
Feedback Endpoints
Method	Endpoint	Description	Access
GET	/api/feedback	Get all feedback	Admin
POST	/api/feedback	Submit feedback	User
DELETE	/api/admin/feedback/{id}	Delete feedback	Admin
🎯 User Workflow
👤 Customer Journey
Step	Action
1	Register/Login to account
2	Browse products (search, filter, sort)
3	View product details
4	Add products to cart
5	Add products to wishlist (optional)
6	Proceed to checkout
7	Enter shipping address
8	Select payment method (COD/UPI/Card)
9	Place order
10	Track order status in "My Orders"
11	Receive real-time updates
12	Submit feedback after delivery
👑 Admin Journey
Step	Action
1	Login with admin credentials
2	View dashboard analytics
3	Add/Edit/Delete products
4	Manage incoming orders
5	Confirm pending orders
6	Add courier & tracking details
7	Mark orders as shipped
8	Mark orders as delivered
9	Publish announcements
10	Review customer feedback
🧪 Testing Credentials
👑 Administrator Access
Field	Value
📧 Email	admin@quickmart.com
🔑 Password	admin123
👤 Customer Access
Field	Value
📧 Email	customer@quickmart.com
🔑 Password	customer123
💳 Test Payment Details
Payment Method	Test Credentials
UPI	test@okhdfcbank
Card Number	4111 1111 1111 1111
Expiry	12/25
CVV	123
📁 Project Structure
text
quickmart/
│
├── frontend/                         # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/           # Reusable components
│   │   │   │   └── navbar/           # Navigation component
│   │   │   ├── models/               # Data interfaces
│   │   │   ├── pages/
│   │   │   │   ├── admin/            # Admin modules
│   │   │   │   │   ├── add-product/
│   │   │   │   │   ├── admin-home/
│   │   │   │   │   ├── announcement/
│   │   │   │   │   ├── feedback/
│   │   │   │   │   └── sales/
│   │   │   │   ├── user/             # User modules
│   │   │   │   │   ├── my-cart/
│   │   │   │   │   ├── my-orders/
│   │   │   │   │   ├── my-profile/
│   │   │   │   │   ├── payment/
│   │   │   │   │   ├── user-feedback/
│   │   │   │   │   └── user-item/
│   │   │   │   ├── about/
│   │   │   │   ├── contact-us/
│   │   │   │   ├── home/
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   └── services/             # API services
│   │   ├── assets/                   # Static assets
│   │   └── environments/             # Environment configs
│   ├── angular.json
│   └── package.json
│
├── backend/                          # Spring Boot Application
│   ├── src/main/java/
│   │   └── com/marketplace/E_commerce/
│   │       ├── config/               # Configuration classes
│   │       ├── controllers/          # REST Controllers
│   │       ├── models/               # Entity classes
│   │       ├── repositories/         # JPA Repositories
│   │       └── services/             # Business logic
│   └── src/main/resources/
│       └── application.properties
│
└── database/                         # Database scripts
    └── schema.sql
🐛 Troubleshooting Guide
Problem	Solution
CORS Error	Add @CrossOrigin(origins = "http://localhost:4200") to controllers
Database Connection Failed	Verify MySQL service is running and credentials are correct
Images Not Loading	Ensure images are in uploads/ directory and path is correct
Login Authentication Failed	Clear browser localStorage and try again
Port Already in Use	Change port in application.properties or kill process using port
npm install errors	Delete node_modules and run npm cache clean --force then npm install
401 Unauthorized	Check if user exists in database or register first
404 Not Found	Verify API endpoint URL is correct
500 Internal Server Error	Check backend logs for detailed error message
Debug Commands
bash
# Check if backend is running
curl http://localhost:8080/actuator/health

# Check database connection
mysql -u root -p -e "SELECT 1"

# Check port availability
netstat -an | findstr :8080    # Windows
lsof -i :8080                   # Mac/Linux

# Clear Angular cache
rm -rf node_modules/.cache
npm cache clean --force

# Rebuild backend
mvn clean compile
🗓️ Future Roadmap
Icon	Feature	Status
📧	Email notifications for order updates	🔜 Planned
📱	SMS alerts for delivery status	🔜 Planned
🌐	Multi-language support	🔜 Planned
📸	Product reviews with images	🔜 Planned
🏷️	Discount coupons & promotional offers	🔜 Planned
📄	Invoice PDF generation	🔜 Planned
🔗	Social media login integration	🔜 Planned
🤖	AI-powered product recommendations	🔜 Planned
💬	Real-time chat support	🔜 Planned
📊	Advanced analytics dashboard	🔜 Planned
🔔	Push notifications	🔜 Planned
📱	Mobile app (Flutter)	🔜 Planned
🤝 Contributing
We welcome contributions! Please follow these steps:

Step	Action
1	Fork the repository
2	Create a feature branch (git checkout -b feature/AmazingFeature)
3	Commit changes (git commit -m 'Add AmazingFeature')
4	Push to branch (git push origin feature/AmazingFeature)
5	Open a Pull Request
📋 Coding Standards
✅ Follow Angular style guide

✅ Write meaningful commit messages

✅ Add comments for complex logic

✅ Test before submitting

✅ Ensure all tests pass

✅ Update documentation if needed

📄 License
text
MIT License

Copyright (c) 2024 QuickMart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
🙏 Acknowledgments
Icon	Contributor
🅰️	Angular Team for amazing frontend framework
☕	Spring Boot Team for robust backend solution
🐬	MySQL for reliable database
🎨	Angular Material for beautiful UI components
👥	All Contributors who helped improve QuickMart
⭐ Show Your Support
Action	Icon
Star this repository	⭐
Fork this repository	🍴
Share with others	📢
Report issues	🐛
Suggest features	💡
📞 Contact
Role	Contact
Project Maintainer	maintainer@quickmart.com
Technical Support	support@quickmart.com
Business Inquiries	business@quickmart.com
<div align="center">
🎉 Final Note
QuickMart - Making online shopping quick and easy!

Built with ❤️ by the QuickMart Team

© 2024 QuickMart. All Rights Reserved.

⭐ Star this repository if you like this project! ⭐

</div> ```
