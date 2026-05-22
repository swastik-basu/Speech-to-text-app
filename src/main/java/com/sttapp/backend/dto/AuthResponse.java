package com.sttapp.backend.dto;

import lombok.Data;

@Data
public class AuthResponse {

    public String message;
    public AuthResponse(String message){
    	this.message= message;
    }
}