const BASE_URL = "https://speech-to-text-app-production-9797.up.railway.app";

const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (!isFormData) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

const handleResponse = async (res) => {
  const text = await res.text(); // read as plain text first

  let data = {};
  try {
    data = text ? JSON.parse(text) : {}; // only parse if body exists
  } catch {
    data = { message: text || "Invalid response from server" };
  }

  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}`);
  }

  return data;
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
