package com.sttapp.backend.service;

import com.sttapp.backend.dto.AuthResponse;
import com.sttapp.backend.dto.LoginRequest;
import com.sttapp.backend.dto.RegisterRequest;
import com.sttapp.backend.dto.RegisterResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}