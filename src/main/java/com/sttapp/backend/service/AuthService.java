package com.sttapp.backend.service;

import com.sttapp.backend.dto.AuthResponse;
import com.sttapp.backend.dto.LoginRequest;
import com.sttapp.backend.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}