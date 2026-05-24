package com.sttapp.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "transcriptions")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Transcription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    @Column(columnDefinition= "LONGTEXT")
    private String transcript;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}