# Krishi Connect

Krishi Connect is a full-stack agriculture marketplace starter built with React, Tailwind CSS, Node.js, Express, MySQL, JWT authentication, and Socket.IO. It includes role-based dashboards for admins, farmers, and buyers, along with products, orders, chat, analytics, notifications, and payment integration with eSewa and cash on delivery.

## Features

- User registration and authentication with JWT
- Role-based access for admin, farmer, and buyer
- Product CRUD with region/type search and filtering
- Order creation, tracking, and history views
- Real-time chat between farmers and buyers
- Real-time notifications for orders and messages
- Dashboard analytics per role
- Profile management and admin user management
- eSewa (redirect + verify) and cash on delivery payment flows

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express + Socket.IO
- Database: MySQL
- Authentication: JWT
- Deployment targets: Vercel (frontend) and Render (backend)

## Project Structure

```text
SYP/
  frontend/
  backend/
  database.sql
  README.md
```

## Setup

### 1. Create the database

Run [`database.sql`](/d:/E-Agriculture/database.sql) in MySQL.

After importing the schema, create your first admin, farmer, and buyer accounts through the registration UI or seed them yourself with real bcrypt hashes.

### 2. Configure the backend

Create `backend/.env` and add the following values:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
# Authentication
JWT_SECRET=your_jwt_secret_here
# Database Configuration
DB_HOST=your_database_host
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
# eSewa Payment Configuration
ESEWA_FORM_URL=https://rc-epay.esewa.com.np/api/epay/main/v2/form
ESEWA_STATUS_CHECK_URL=https://rc.esewa.com.np/api/epay/transaction/status/
ESEWA_PRODUCT_CODE=your_esewa_product_code
ESEWA_SECRET_KEY=your_esewa_secret_key
# Cloudinary Image Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Configure the frontend

Create `frontend/.env` with:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 4. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 5. Start the apps

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/users`
- `PUT /api/users/profile`
- `DELETE /api/users/:id`
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/orders`
- `POST /api/orders`
- `PUT /api/orders/:id/status`
- `GET /api/chat/conversations`
- `GET /api/chat/:userId`
- `POST /api/chat`
- `GET /api/notifications`
- `PUT /api/notifications/:id/read`
- `GET /api/analytics`
- `POST /api/payments/initiate`
- `POST /api/payments/esewa/verify`
