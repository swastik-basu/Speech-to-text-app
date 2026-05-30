import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let data;
      if (mode === "login") {
        data = await login({ email: form.email, password: form.password });
      } else {
        data = await register({ name: form.name, email: form.email, password: form.password });
      }
      // Spring Boot JWT response: { token: "...", user: {...} } or just { token: "..." }
      const jwt = data.token || data.accessToken || data.jwt;
      const userData = data.user || { email: form.email, name: form.name };
      if (jwt) {
        loginUser(userData, jwt);
        navigate("/dashboard");
      } else if (mode === "register") {
        setMode("login");
        setError("Registered! Please log in.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="brand-icon">◎</span>
          <span className="brand-name">VoiceScribe</span>
        </div>
        <div className="auth-headline">
          <h1>Turn every<br /><em>spoken word</em><br />into text.</h1>
          <p>Upload audio, record live, and get transcriptions powered by your Spring Boot backend.</p>
        </div>
        <div className="auth-pills">
          <span className="pill">🎙 Live Recording</span>
          <span className="pill">📁 File Upload</span>
          <span className="pill">📜 History</span>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="tab-row">
            <button className={`tab-btn ${mode === "login" ? "active" : ""}`} onClick={() => { setMode("login"); setError(""); }}>Sign In</button>
            <button className={`tab-btn ${mode === "register" ? "active" : ""}`} onClick={() => { setMode("register"); setError(""); }}>Create Account</button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {mode === "register" && (
              <div className="field-group">
                <label>Full Name</label>
                <input name="name" type="text" placeholder="Jane Smith" value={form.name} onChange={handleChange} required />
              </div>
            )}
            <div className="field-group">
              <label>Email</label>
              <input name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="field-group">
              <label>Password</label>
              <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
            </div>

            {error && <div className={`auth-msg ${error.includes("Registered") ? "success" : "error"}`}>{error}</div>}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <span className="spinner" /> : mode === "login" ? "Sign In →" : "Create Account →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
