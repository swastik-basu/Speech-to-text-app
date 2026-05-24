package com.sttapp.backend.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sttapp.backend.dto.TranscriptResponse;
import com.sttapp.backend.dto.UploadResponse;
import com.sttapp.backend.service.SpeechService;

import lombok.RequiredArgsConstructor;
import com.sttapp.backend.entity.Transcription;
import com.sttapp.backend.repository.TranscriptionRepository;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class SpeechServiceImpl implements SpeechService {

	public final TranscriptionRepository transcriptionRepository;
	public static final String UPLOAD_DIR = "uploads";

	@Value("${deepgram.api.key}")
	public String deepgramApiKey;

	@Override
	public UploadResponse uploadAudio(MultipartFile file) {

		if (file.isEmpty()) {
			throw new RuntimeException("File is empty");
		}

		String contentType = file.getContentType();

		if (contentType == null || !(contentType.startsWith("audio/"))) {

			throw new RuntimeException("Only audio files are allowed");
		}

		try {

			File uploadFolder = new File(UPLOAD_DIR);

			if (!uploadFolder.exists()) {
				uploadFolder.mkdirs();
			}

			String originalFileName = file.getOriginalFilename();

			String uniqueFileName = UUID.randomUUID() + "_" + originalFileName;

			java.nio.file.Path path = java.nio.file.Paths.get(UPLOAD_DIR, uniqueFileName);

			file.transferTo(path);

			return new UploadResponse(uniqueFileName, "Audio uploaded successfully");

		} catch (IOException e) {
			throw new RuntimeException("Failed to upload audio");
		}
	}

	@Override
	public TranscriptResponse transcribeAudio(MultipartFile file) {

		try {

			byte[] audioBytes = file.getBytes();

			WebClient webClient = WebClient.builder().baseUrl("https://api.deepgram.com")
					.defaultHeader(HttpHeaders.AUTHORIZATION, "Token " + deepgramApiKey).build();

			String response = webClient.post().uri("/v1/listen").contentType(MediaType.valueOf("audio/wav"))
					.bodyValue(audioBytes).retrieve().bodyToMono(String.class).block();

			ObjectMapper objectMapper = new ObjectMapper();

			JsonNode root = objectMapper.readTree(response);

			String transcript = root.path("results").path("channels").get(0).path("alternatives").get(0)
					.path("transcript").asText();

			Transcription transcriptionEntity = Transcription.builder().fileName(file.getOriginalFilename())
					.transcript(transcript).createdAt(LocalDateTime.now()).build();

			transcriptionRepository.save(transcriptionEntity);

			return new TranscriptResponse(transcript);

		} catch (Exception e) {

			e.printStackTrace();

			throw new RuntimeException("Failed to transcribe audio");
		}
	}

	@Override
	public List<Transcription> getHistory() {

		return transcriptionRepository.findAllByOrderByCreatedAtDesc();
	}

	@Override
	public Transcription getTranscriptById(Long id) {

		return transcriptionRepository.findById(id).orElseThrow(() -> new RuntimeException("Transcript not found"));
	}
}