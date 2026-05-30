package com.sttapp.backend.controller;

import com.sttapp.backend.dto.AuthResponse;
import com.sttapp.backend.dto.LoginRequest;
import com.sttapp.backend.dto.RegisterRequest;
import com.sttapp.backend.dto.RegisterResponse;
import com.sttapp.backend.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")

@RequiredArgsConstructor

public class AuthController {

    public final AuthService authService;

    @PostMapping("/register")
    public RegisterResponse register(
            @RequestBody RegisterRequest request
    ) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request
    ) {
        return authService.login(request);
    }
}