package com.sttapp.backend.service;

import com.sttapp.backend.dto.UploadResponse;
import org.springframework.web.multipart.MultipartFile;

public interface SpeechService {

    UploadResponse uploadAudio(MultipartFile file);
}