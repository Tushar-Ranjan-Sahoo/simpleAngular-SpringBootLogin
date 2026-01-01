# Quick Start Guide

## Step-by-Step Instructions

### 1. Start MongoDB
Make sure MongoDB is running on `localhost:27017`

### 2. Start Backend (Spring Boot)

Open a terminal and run:
```bash
cd backend
.\mvnw.cmd spring-boot:run
```

**Note**: If you get an error about Maven not being found, use `.\mvnw.cmd` instead of `mvn`. The Maven Wrapper is included and doesn't require Maven to be installed.

Wait for: "Started SimpleAuthApplication in X seconds"

### 3. Start Frontend (Angular)

Open a **new terminal** and run:
```bash
cd frontend
npm install
npm start
```

Wait for: "Application bundle generation complete" and "Local: http://localhost:4200"

### 4. Access the Application

Open your browser and go to: `http://localhost:4200`

## Testing the Application

1. **Sign Up**: Click "Don't have an account? Sign Up"
   - Enter: Name, Email, Password
   - Click "Sign Up"
   - You'll be redirected to login page

2. **Login**: 
   - Enter the email and password you just created
   - Click "Login"
   - You'll be redirected to the dashboard

3. **Dashboard**: 
   - You should see "Welcome, [Your Name]!"
   - Click "Logout" to return to login page

## Troubleshooting

- **Backend won't start**: Check if MongoDB is running
- **Frontend won't start**: Make sure you ran `npm install` first
- **CORS errors**: Ensure backend is running on port 8080
- **Connection errors**: Verify both servers are running

