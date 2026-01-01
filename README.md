# Simple Authentication Project

A simple full-stack authentication application built with Angular (frontend) and Spring Boot (backend) using MongoDB.

## Project Structure

```
simpleAngularAndSpringBootLogin/
├── backend/          # Spring Boot application
└── frontend/         # Angular application
```

## Prerequisites

- Java 17 or higher
- Node.js 18+ and npm
- MongoDB (running on localhost:27017)
- Maven 3.6+ (or use the included Maven Wrapper - no installation needed!)

## Setup Instructions

### 1. MongoDB Setup

Make sure MongoDB is running on your local machine:
```bash
# MongoDB should be running on localhost:27017
# The database 'simple_auth' will be created automatically
```

### 2. Backend Setup (Spring Boot)

Navigate to the backend directory:
```bash
cd backend
```

Build and run the Spring Boot application:
```bash
# Using Maven Wrapper (recommended - no Maven installation needed)
.\mvnw.cmd spring-boot:run

# OR if you have Maven installed globally:
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup (Angular)

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the Angular development server:
```bash
npm start
# or
ng serve
```

The frontend will start on `http://localhost:4200`

## API Endpoints

### POST /api/auth/signup
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Features

- **Signup Page**: Register new users with name, email, and password
- **Login Page**: Authenticate users with email and password
- **Dashboard Page**: Protected route that displays logged-in user information
- **AuthGuard**: Protects dashboard route from unauthorized access
- **localStorage**: Stores user session information

## Notes

- This is a **demo/learning project** only
- Passwords are stored in **plain text** (not recommended for production)
- No Spring Security or JWT tokens are used
- Simple API-based authentication
- CORS is enabled for `http://localhost:4200`

## Running Both Servers

1. Start MongoDB
2. Start Spring Boot backend (port 8080)
3. Start Angular frontend (port 4200)
4. Open browser and navigate to `http://localhost:4200`

