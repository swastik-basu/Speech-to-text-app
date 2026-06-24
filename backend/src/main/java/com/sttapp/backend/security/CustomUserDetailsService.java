package com.sttapp.backend.security;

import com.sttapp.backend.entity.User;
import com.sttapp.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService
                implements UserDetailsService {

        private final UserRepository userRepository;

        @Override
        public UserDetails loadUserByUsername(
                        String email) throws UsernameNotFoundException {

                User user = userRepository
                                .findByEmail(email)
                                .orElseThrow(() -> new UsernameNotFoundException(
                                                "User not found"));

                return org.springframework.security.core.userdetails.User
                                .builder()
                                .username(user.getEmail())
                                .password(user.getPassword())
                                .authorities("USER")
                                .build();
        }
}