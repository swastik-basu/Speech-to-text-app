package com.sttapp.backend.controller;

import com.sttapp.backend.dto.UploadResponse;
import com.sttapp.backend.service.SpeechService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/speech")

@RequiredArgsConstructor

public class SpeechController {

    public final SpeechService speechService;

    @PostMapping("/upload")
    public UploadResponse uploadAudio(
            @RequestParam("file") MultipartFile file
    ) {
        return speechService.uploadAudio(file);
    }
}