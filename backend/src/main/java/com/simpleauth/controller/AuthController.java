package com.simpleauth.controller;

import com.simpleauth.dto.AuthResponse;
import com.simpleauth.dto.LoginRequest;
import com.simpleauth.dto.SignupRequest;
import com.simpleauth.model.User;
import com.simpleauth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest request) {
        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(false, "Email already exists"));
        }
        
        // Create new user
        User user = new User(request.getName(), request.getEmail(), request.getPassword());
        userRepository.save(user);
        
        return ResponseEntity.ok(new AuthResponse(true, "User registered successfully"));
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, "Invalid email or password"));
        }
        
        // Simple password check (in production, use password hashing)
        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, "Invalid email or password"));
        }
        
        // Return success with user info
        return ResponseEntity.ok(new AuthResponse(true, "Login successful", 
                user.getName(), user.getEmail()));
    }
}

