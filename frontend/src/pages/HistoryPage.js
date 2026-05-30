import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHistory, getTranscript } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function HistoryPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getHistory()
      .then((data) => {
        // Handle array or { content: [...] } Spring Page response
        const list = Array.isArray(data) ? data : data.content || data.transcriptions || [];
        setRecords(list);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = async (item) => {
    if (selected?.id === item.id) { setSelected(null); return; }
    setDetailLoading(true);
    try {
      const detail = await getTranscript(item.id);
      setSelected(detail);
    } catch {
      setSelected(item);
    } finally { setDetailLoading(false); }
  };

  const formatDate = (ts) => {
    if (!ts) return "—";
    const d = new Date(ts);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const downloadTxt = (text, filename) => {
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = filename || "transcript.txt"; a.click();
  };

  return (
    <div className="dash-root">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">◎</span>
          <span>VoiceScribe</span>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item" onClick={() => navigate("/dashboard")}>
            <span className="nav-icon">⚡</span> Transcribe
          </button>
          <button className="nav-item active">
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

      <main className="dash-main">
        <div className="dash-header">
          <div>
            <h2>Transcription History</h2>
            <p className="dash-subtitle">All your past recordings and transcriptions</p>
          </div>
          <button className="btn-primary" onClick={() => navigate("/dashboard")}>+ New Transcription</button>
        </div>

        <div className="dash-content">
          {error && <div className="error-banner">{error}</div>}

          {loading ? (
            <div className="full-loading">
              <div className="loading-bars"><span /><span /><span /><span /><span /></div>
              <p>Loading history…</p>
            </div>
          ) : records.length === 0 ? (
            <div className="history-empty">
              <span className="empty-icon-lg">📭</span>
              <h3>No transcriptions yet</h3>
              <p>Start by uploading an audio file or recording your voice.</p>
              <button className="btn-primary" onClick={() => navigate("/dashboard")}>Start Transcribing</button>
            </div>
          ) : (
            <div className="history-layout">
              <div className="history-list">
                {records.map((item) => (
                  <div key={item.id} className={`history-card ${selected?.id === item.id ? "active" : ""}`} onClick={() => handleSelect(item)}>
                    <div className="hcard-left">
                      <div className="hcard-icon">🎵</div>
                      <div className="hcard-info">
                        <span className="hcard-file">{item.audioFile || item.audio_file || `Recording #${item.id}`}</span>
                        <span className="hcard-date">{formatDate(item.createdAt || item.created_at)}</span>
                      </div>
                    </div>
                    <div className="hcard-preview">
                      {(item.transcript || item.text || "").substring(0, 60)}{(item.transcript || item.text || "").length > 60 ? "…" : ""}
                    </div>
                    <span className="hcard-arrow">{selected?.id === item.id ? "▾" : "›"}</span>
                  </div>
                ))}
              </div>

              <div className="history-detail">
                {detailLoading ? (
                  <div className="full-loading">
                    <div className="loading-bars"><span /><span /><span /><span /><span /></div>
                  </div>
                ) : selected ? (
                  <>
                    <div className="detail-header">
                      <div>
                        <h3>{selected.audioFile || selected.audio_file || `Recording #${selected.id}`}</h3>
                        <span className="detail-date">{formatDate(selected.createdAt || selected.created_at)}</span>
                      </div>
                      <button className="icon-btn" title="Download" onClick={() => downloadTxt(selected.transcript || selected.text || "", `transcript-${selected.id}.txt`)}>↓ .txt</button>
                    </div>
                    <div className="detail-body">
                      <p>{selected.transcript || selected.text || "No transcript available."}</p>
                    </div>
                  </>
                ) : (
                  <div className="detail-empty">
                    <span>👈</span>
                    <p>Select a recording to view its transcript</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
