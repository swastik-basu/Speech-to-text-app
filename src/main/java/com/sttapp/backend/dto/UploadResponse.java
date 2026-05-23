package com.sttapp.backend.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class UploadResponse{
	private String fileName;
	private String message;
}