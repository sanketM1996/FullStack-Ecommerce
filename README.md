🛒 FullStack E-Commerce Application
🚀 Overview

A full-stack eCommerce platform built using Spring Boot (Backend) and React (Frontend).
It includes role-based authentication (Admin, Seller, User), product & category management, image upload with Cloudinary, and pagination, sorting, filtering, etc.

⚙️ Tech Stack
Backend (Spring Boot)

Java 17+

Spring Boot 3.x

Spring Security (JWT Authentication)

Spring Data JPA (MySQL)

Cloudinary (Image Upload)

Hibernate Validator (Field Validation)

Lombok

Docker (optional)

Maven

Frontend

React / Vite (or CRA)

Redux Toolkit

React Router

Axios

Tailwind CSS / MUI (depending on UI choice)

🧩 Features
👤 Authentication & Authorization

JWT-based authentication

Role-based access control:

ADMIN — Manage all products, categories, and users

SELLER — Add/update/delete own products

USER — Browse and view products

🛍️ Product Management

Add, update, delete, and view products

Upload product images (Cloudinary integration)

Search products by keyword or category

Pagination, sorting, and filtering support

🗂️ Category Management

CRUD operations for categories

Category-based product filtering

📦 Order & Cart (Future Scope)

Cart management
__________________
to run add .evn file add stripe publish key for frontend and secret key for backend
