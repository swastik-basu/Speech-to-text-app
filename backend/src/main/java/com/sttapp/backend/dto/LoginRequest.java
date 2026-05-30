package com.sttapp.backend.dto;

import org.jspecify.annotations.Nullable;

import lombok.*;



@Data
public class LoginRequest {

    private String email;

    private String password;
}