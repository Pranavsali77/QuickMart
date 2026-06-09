# 🛒 QuickMart

QuickMart is a full-stack online marketplace application that allows users to browse products, purchase items, submit feedback, and stay updated with announcements. The platform includes a dedicated Admin Dashboard for managing products, sales records, customer feedback, announcements, and delivery status.

---

## 🚀 Features

### 👤 User Module
- User Registration & Login
- View Available Products
- Product Search & Browsing
- Buy Products
- Payment Integration
- Submit Feedback
- View Announcements
- Contact Us Page

### 🔐 Admin Module
- Secure Admin Login
- Add New Products
- Update Product Details
- Delete Products
- Upload Product Images
- Manage Customer Feedback
- Manage Announcements
- View Sales Records
- Track Delivery Status

---

## 🏗️ Project Architecture

```text
Frontend (Angular/React)
        │
        ▼
REST APIs (Spring Boot)
        │
        ▼
      MySQL
        │
        ▼
 Product Images (Uploads Folder)
🛠️ Technologies Used
Frontend
Angular / React.js
TypeScript
HTML5
CSS3
Bootstrap
Backend
Java
Spring Boot
Spring MVC
Spring Data JPA
REST API
Database
MySQL
Tools
Git
GitHub
Postman
VS Code
IntelliJ IDEA
Maven
📂 Project Structure
QuickMart
│
├── frontend
│   ├── src
│   ├── components
│   ├── services
│   └── assets
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── model
│   └── uploads
│
├── database
│   └── quickmart.sql
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/Pranavsali77/QuickMart.git
cd QuickMart
2️⃣ Backend Setup
Configure Database

Update application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/quickmart
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
Run Backend
mvn spring-boot:run

Backend runs on:

http://localhost:8080
3️⃣ Frontend Setup

Install Dependencies

npm install

Run Application

ng serve

or

npm start

Frontend runs on:

http://localhost:4200
📸 Product Image Upload

QuickMart supports product image uploads.

Images are stored in:

/uploads

and accessed through REST APIs.

🔌 API Endpoints
Product APIs
Method	Endpoint	Description
GET	/api/products	Get All Products
GET	/api/products/{id}	Get Product By ID
POST	/api/products	Add Product
PUT	/api/products/{id}	Update Product
DELETE	/api/products/{id}	Delete Product
Feedback APIs
Method	Endpoint
GET	/api/feedback
POST	/api/feedback
Announcement APIs
Method	Endpoint
GET	/api/announcements
POST	/api/announcements
🔒 Authentication

QuickMart provides:

User Signup
User Login
Admin Login
Session/JWT Authentication
Role-Based Access Control
🎯 Future Enhancements
AI Product Recommendation
Email Notifications
Order Tracking
Online Payment Gateway
Wishlist Feature
Product Reviews & Ratings
Analytics Dashboard
👨‍💻 Developer

Pranav Sali

Full Stack Developer
Java | Spring Boot | Angular | React | MySQL

GitHub:
https://github.com/Pranavsali77

📄 License

This project is developed for learning and educational purposes.

© 2026 QuickMart. All Rights Reserved.


You can copy the above content directly into your `README.md` file and customize the technology stack (Angular or Reac
