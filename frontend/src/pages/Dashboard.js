import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { uploadAudio, transcribeAudio } from "../services/api";

const formatDuration = (s) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

export default function Dashboard() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("upload");
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  const { isRecording, audioBlob, audioURL, duration, error: recError, startRecording, stopRecording, resetRecording } = useAudioRecorder();

  const handleFile = (f) => {
    if (f && f.type.startsWith("audio/")) { setFile(f); setError(""); }
    else setError("Please select a valid audio file.");
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    handleFile(f);
  };

  const handleTranscribeUpload = async () => {
    if (!file) return;
    setLoading(true); setError(""); setTranscript("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const data = await transcribeAudio(fd);
      setTranscript(data.transcript || data.text || data.transcription || JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  const handleTranscribeRecording = async () => {
    if (!audioBlob) return;
    setLoading(true); setError(""); setTranscript("");
    try {
      const fd = new FormData();
      fd.append("file", new File([audioBlob], "recording.webm", { type: "audio/webm" }));
      const data = await transcribeAudio(fd);
      setTranscript(data.transcript || data.text || data.transcription || JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  const handleUploadOnly = async () => {
    if (!file) return;
    setLoading(true); setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      await uploadAudio(fd);
      setError(""); setTranscript("File uploaded successfully.");
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  const copyToClipboard = () => { navigator.clipboard.writeText(transcript); };

  const downloadTxt = () => {
    const blob = new Blob([transcript], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "transcript.txt"; a.click();
  };

  return (
    <div className="dash-root">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">◎</span>
          <span>VoiceScribe</span>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <span className="nav-icon">⚡</span> Transcribe
          </button>
          <button className="nav-item" onClick={() => navigate("/history")}>
            <span className="nav-icon">📜</span> History
          </button>
        </nav>
        <div className="sidebar-footer">
          <div className="user-badge">
            <div className="user-avatar">{(user?.name || user?.email || "U")[0].toUpperCase()}</div>
            <div className="user-info">
              <span className="user-name">{user?.name || "User"}</span>
              <span className="user-email">{user?.email || ""}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={() => { logoutUser(); navigate("/"); }}>Sign Out</button>
        </div>
      </aside>

      {/* Main */}
      <main className="dash-main">
        <div className="dash-header">
          <div>
            <h2>Transcribe Audio</h2>
            <p className="dash-subtitle">Upload a file or record your voice to convert speech to text</p>
          </div>
        </div>

        <div className="dash-content">
          {/* Tab switcher */}
          <div className="tab-switcher">
            <button className={`mode-tab ${tab === "upload" ? "active" : ""}`} onClick={() => { setTab("upload"); setTranscript(""); setError(""); }}>
              <span>📁</span> Upload File
            </button>
            <button className={`mode-tab ${tab === "record" ? "active" : ""}`} onClick={() => { setTab("record"); setTranscript(""); setError(""); }}>
              <span>🎙</span> Record Voice
            </button>
          </div>

          <div className="panel-grid">
            {/* Input panel */}
            <div className="input-panel">
              {tab === "upload" ? (
                <>
                  <div
                    className={`drop-zone ${dragOver ? "drag-active" : ""} ${file ? "has-file" : ""}`}
                    onClick={() => fileRef.current.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                  >
                    <input ref={fileRef} type="file" accept="audio/*" hidden onChange={(e) => handleFile(e.target.files[0])} />
                    {file ? (
                      <div className="file-selected">
                        <span className="file-icon">🎵</span>
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
                        <button className="file-clear" onClick={(e) => { e.stopPropagation(); setFile(null); }}>✕</button>
                      </div>
                    ) : (
                      <>
                        <div className="drop-icon">☁</div>
                        <p className="drop-text">Drop your audio file here</p>
                        <p className="drop-sub">or click to browse — MP3, WAV, M4A, WEBM, OGG</p>
                      </>
                    )}
                  </div>
                  <div className="btn-row">
                    <button className="btn-secondary" onClick={handleUploadOnly} disabled={!file || loading}>Upload Only</button>
                    <button className="btn-primary" onClick={handleTranscribeUpload} disabled={!file || loading}>
                      {loading ? <><span className="spinner-sm" /> Transcribing…</> : "Transcribe →"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="record-zone">
                    <div className={`record-visual ${isRecording ? "pulsing" : ""}`}>
                      <div className="record-ring r1" />
                      <div className="record-ring r2" />
                      <div className="record-ring r3" />
                      <button
                        className={`record-btn ${isRecording ? "recording" : ""}`}
                        onClick={isRecording ? stopRecording : startRecording}
                      >
                        {isRecording ? "■" : "●"}
                      </button>
                    </div>
                    <div className="record-status">
                      {isRecording ? (
                        <><span className="rec-dot" /> Recording — {formatDuration(duration)}</>
                      ) : audioBlob ? (
                        <span>Recording ready — {formatDuration(duration)}</span>
                      ) : (
                        <span>Click to start recording</span>
                      )}
                    </div>
                    {audioURL && (
                      <audio controls src={audioURL} className="audio-preview" />
                    )}
                    {(recError) && <p className="error-msg">{recError}</p>}
                  </div>
                  <div className="btn-row">
                    {audioBlob && <button className="btn-secondary" onClick={resetRecording}>Reset</button>}
                    <button className="btn-primary" onClick={handleTranscribeRecording} disabled={!audioBlob || loading || isRecording}>
                      {loading ? <><span className="spinner-sm" /> Transcribing…</> : "Transcribe →"}
                    </button>
                  </div>
                </>
              )}
              {error && <div className="error-msg">{error}</div>}
            </div>

            {/* Transcript panel */}
            <div className="transcript-panel">
              <div className="transcript-header">
                <span>Transcript</span>
                {transcript && (
                  <div className="transcript-actions">
                    <button className="icon-btn" title="Copy" onClick={copyToClipboard}>⎘</button>
                    <button className="icon-btn" title="Download" onClick={downloadTxt}>↓</button>
                  </div>
                )}
              </div>
              <div className={`transcript-body ${!transcript ? "empty" : ""}`}>
                {loading ? (
                  <div className="loading-state">
                    <div className="loading-bars">
                      <span /><span /><span /><span /><span />
                    </div>
                    <p>Converting speech to text…</p>
                  </div>
                ) : transcript ? (
                  <p className="transcript-text">{transcript}</p>
                ) : (
                  <div className="empty-state">
                    <span className="empty-icon">📝</span>
                    <p>Your transcript will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
