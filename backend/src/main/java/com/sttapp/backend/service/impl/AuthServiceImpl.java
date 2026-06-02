package com.sttapp.backend.service.impl;
import com.sttapp.backend.dto.AuthResponse;
import com.sttapp.backend.dto.LoginRequest;
import com.sttapp.backend.dto.RegisterRequest;
import com.sttapp.backend.dto.RegisterResponse;
import com.sttapp.backend.entity.User;
import com.sttapp.backend.repository.UserRepository;
import com.sttapp.backend.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.sttapp.backend.security.JWTService;
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	
	private final JWTService jwtService;
    public final UserRepository userRepository;
    public final BCryptPasswordEncoder passwordEncoder;

    @Override
    public RegisterResponse register(RegisterRequest request) {

        if(userRepository.findByEmail(request.getEmail()).isPresent()== false) {
        	User user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .build();

            userRepository.save(user);

            return new RegisterResponse("User registered successfully");
        }
        
        return new RegisterResponse("Email is already present !!");

        
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
            return new AuthResponse("Invalid email or password");
        }

        String token =
                jwtService.generateToken(
                        user.getEmail()
                );

        return new AuthResponse(token);
    }
}
