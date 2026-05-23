package com.sttapp.backend.service.impl;

import com.sttapp.backend.dto.UploadResponse;
import com.sttapp.backend.service.SpeechService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class SpeechServiceImpl implements SpeechService {

    public static final String UPLOAD_DIR = "upload";

    @Override
    public UploadResponse uploadAudio(MultipartFile file) {

        if(file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        String contentType = file.getContentType();

        if(contentType == null ||
                !(contentType.startsWith("audio/"))) {

            throw new RuntimeException("Only audio files are allowed");
        }

        try {

            File uploadFolder = new File(UPLOAD_DIR);

            if(!uploadFolder.exists()) {
                uploadFolder.mkdirs();
            }

            String originalFileName = file.getOriginalFilename();

            String uniqueFileName =
                    UUID.randomUUID() + "_" + originalFileName;

            String filePath = UPLOAD_DIR + uniqueFileName;

            file.transferTo(new File(filePath));

            return new UploadResponse(
                    uniqueFileName,
                    "Audio uploaded successfully"
            );

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload audio");
        }
    }
}