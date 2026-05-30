const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (!isFormData) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json().catch(() => ({}));
};

// Auth
export const register = (data) =>
  fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const login = (data) =>
  fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

// Speech
export const uploadAudio = (formData) =>
  fetch(`${BASE_URL}/api/speech/upload`, {
    method: "POST",
    headers: getHeaders(true),
    body: formData,
  }).then(handleResponse);

export const transcribeAudio = (formData) =>
  fetch(`${BASE_URL}/api/speech/transcribe`, {
    method: "POST",
    headers: getHeaders(true),
    body: formData,
  }).then(handleResponse);

export const getHistory = () =>
  fetch(`${BASE_URL}/api/speech/history`, {
    headers: getHeaders(),
  }).then(handleResponse);

export const getTranscript = (id) =>
  fetch(`${BASE_URL}/api/speech/${id}`, {
    headers: getHeaders(),
  }).then(handleResponse);
