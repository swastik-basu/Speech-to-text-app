package com.sttapp.backend.service;
import com.sttapp.backend.dto.TranscriptResponse;
import com.sttapp.backend.entity.Transcription;
import java.util.List;
import com.sttapp.backend.dto.UploadResponse;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.*;
public interface SpeechService {

    UploadResponse uploadAudio(MultipartFile file);
    TranscriptResponse transcribeAudio(MultipartFile file);
    
    List<Transcription> getHistory();

    Transcription getTranscriptById(Long id);
}