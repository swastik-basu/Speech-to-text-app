package com.sttapp.backend.controller;

import com.sttapp.backend.dto.TranscriptResponse;
import com.sttapp.backend.dto.UploadResponse;
import com.sttapp.backend.entity.Transcription;
import com.sttapp.backend.service.SpeechService;
import com.sttapp.backend.service.impl.SpeechServiceImpl;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/speech")

@RequiredArgsConstructor

public class SpeechController {

	public final SpeechService speechService;

	@PostMapping("/upload")
	public UploadResponse uploadAudio(@RequestParam("file") MultipartFile file) {
		return speechService.uploadAudio(file);
	}

	@PostMapping("/transcribe")
	public TranscriptResponse transcribeAudio(@RequestParam("file") MultipartFile file) {
		return speechService.transcribeAudio(file);
	}
	
	@GetMapping("/history")
	public List<Transcription> getHistory() {

	    return speechService.getHistory();
	}
	@GetMapping("/{id}")
	public Transcription getTranscriptById(@PathVariable Long id) {

		return speechService.getTranscriptById(id);
	}
}