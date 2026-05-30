package com.sttapp.backend.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class UploadResponse{
	public String fileName;
	public String message;
}