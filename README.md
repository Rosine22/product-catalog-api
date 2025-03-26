# product-catalog-api

# 🛍️ Product Catalog API

## 📖 Overview

This is a **Product Catalog API** that allows you to **manage products, categories and manage the stock in genearal **.

## 🚀 Features

- **Product Management**: Create, Read, Update, Delete (CRUD) products.
- **Category Management**: Organize products into categories.
- **Basic Retrieving**: Retrieve products and categories


---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)

---

## ⚙️ Installation

### 1️⃣ Clone the repository:

```sh
https://github.com/Rosine22/product-catalog-api.git
cd product-catalog-api
```

### 2️⃣ Install dependencies:

```sh
npm install
```

### 3️⃣ Set up environment variables:

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=mongodb+srv://rosine:R8xoDNENb1E37x6p@cluster0.lrirs2v.mongodb.net/product-catalog?retryWrites=true&w=majority&appName=Cluster0
```

### 4️⃣ Start the server:

```sh
npm start
```

The server will run on **http://localhost:3000**.

---

## 📌 API Endpoints

### 🛒 **Product Management**

| Method     | Endpoint            | Description          |
| ---------- | ------------------- | -------------------- |
| **GET**    | `/api/products`     | Get all products     |
| **GET**    | `/api/products/:id` | Get product by ID    |
| **POST**   | `/api/products`     | Create a new product |
| **PATCH**  | `/api/products/:id` | Update a product     |
| **DELETE** | `/api/products/:id` | Delete a product     |

### 📂 **Category Management**

| Method     | Endpoint              | Description           |
| ---------- | --------------------- | --------------------- |
| **GET**    | `/api/categories`     | Get all categories    |
| **POST**   | `/api/categories`     | Create a new category |
| **PATCH**  | `/api/categories/:id` | Update a category     |
| **DELETE** | `/api/categories/:id` | Delete a category     |



## 📌 Folder Structure

```
📦 product-catalog-api
├── 📂 controllers    # API controllers
├── 📂 models         # Mongoose models
├── 📂 routes         # API routes
├── 📂 middleware     # Custom middleware
├── index.js          # Main server file
├──  .env            # MongoDb connection
└── package.json     # Dependencies & scripts
```

---

## 🛠️ Running Tests

To run tests (if applicable):

```sh
npm test
```

---
