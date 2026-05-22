package com.sttapp.backend.service.impl;

import com.sttapp.backend.dto.AuthResponse;
import com.sttapp.backend.dto.LoginRequest;
import com.sttapp.backend.dto.RegisterRequest;
import com.sttapp.backend.entity.User;
import com.sttapp.backend.repository.UserRepository;
import com.sttapp.backend.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    public final UserRepository userRepository;
    public final BCryptPasswordEncoder passwordEncoder;

    @Override
    public AuthResponse register(RegisterRequest request) {

        if(userRepository.findByEmail(request.getEmail()).isPresent()== false) {
        	User user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .build();

            userRepository.save(user);

            return new AuthResponse("User registered successfully");
        }
        
        return new AuthResponse("Email is already present !!");

        
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if(user == null) {
            return new AuthResponse("User not found");
        }

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if(!matches) {
            return new AuthResponse("Invalid password");
        }

        return new AuthResponse("Login successful");
    }
}