# MERN Stack Authentication System

A robust and secure authentication system built with the **MERN stack** (MongoDB, Express, React, Node.js). This project implements a complete user lifecycle, featuring email verification, secure JWT session management via HTTP-only cookies, and a comprehensive password recovery workflow.

---

## 🚀 Features

* **Secure Registration**: User signup with input validation using **Joi**.
* **Email Verification**: Automated verification links sent via **Nodemailer** using **Crypto**-generated tokens.
* **JWT Authentication**: Secure login issuing Access and Refresh tokens.
* **Cookie-Based Security**: Tokens are stored in **HTTP-only cookies** using `cookie-parser` to mitigate XSS attacks.
* **Password Recovery**: Secure "Forgot Password" and "Reset Password" flow.
* **Security Headers**: Integrated **Helmet** for setting secure HTTP headers.
* **Rate Limiting**: Protection against brute-force attacks on Login and Forgot Password routes.
* **Persistent Sessions**: `/me` endpoint to fetch authenticated user data via a `protect` middleware.

---

## 🛠️ API Endpoints

### Auth Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register user & send verification email. |
| `POST` | `/api/auth/login` | Authenticate user & issue cookies (Rate limited). |
| `POST` | `/api/auth/verify-email/:token` | Verify account via email link. |
| `POST` | `/api/auth/refresh-token` | Renew Access Token using Refresh Token. |
| `POST` | `/api/auth/forgot-password` | Request password reset link (Rate limited). |
| `POST` | `/api/auth/reset-password/:token` | Update password with secure token. |
| `POST` | `/api/auth/logout` | Clear cookies and terminate session. |
| `GET` | `/api/auth/me` | Get current authenticated user (Protected). |

---

## 🔐 Security & Dependencies

This project leverages industry-standard packages to ensure data integrity and protection:

* **Authentication**: `jsonwebtoken` for stateless auth and `bcrypt` for password hashing.
* **Validation**: `joi` for strict schema-based request validation.
* **Middleware**: `cookie-parser` for handling JWTs and `cors` for cross-origin resource sharing.
* **Security**: `helmet` for header security and `express-rate-limit` to prevent abuse.
* **Email**: `nodemailer` for SMTP-based transactional emails.
* **Tokens**: `crypto` for generating high-entropy verification and reset tokens.

---

## 🚦 Getting Started

### Prerequisites

* Node.js (v18+)
* MongoDB (Local or Atlas)
* SMTP Credentials (Gmail App Password or Mailtrap)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mohankumaronly/Authentication_using_MERN.git auth
cd auth

```


2. **Install Dependencies**
```bash
npm install

```


3. **Environment Variables**
Create a `.env` file in the root directory:
```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
JWT_SECRET_KEY=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

```


4. **Run the Server**
```bash
# Production mode
npm start

# Development mode (with nodemon)
npm run dev

```



---

## 📂 Project Structure

```text
├── src/
│   ├── controllers/    # Request handlers (register, login, reset-password)
│   ├── middlewares/    # protect, validate (Joi), and limiter
│   ├── models/         # Mongoose User Schema
│   ├── routes/         # authRouter definitions
│   ├── utils/          # Email service (Nodemailer) & Token logic
│   └── app.js          # Express app, Helmet, and Cookie-parser config
└── .env                # Environment configuration

```
