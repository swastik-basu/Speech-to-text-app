# VoiceScribe — React Frontend

Speech-to-Text frontend built with React for the Spring Boot backend.

## Pages Covered (Days 8–11)
| Day | Deliverable |
|-----|-------------|
| 8   | React app setup, routing, global CSS, AuthContext |
| 9   | Login & Register UI with JWT token handling |
| 10  | Audio Upload + Microphone Recording interface |
| 11  | Transcript display + History page |

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure backend URL
```bash
cp .env.example .env
# Edit .env and set REACT_APP_API_URL to your Spring Boot server
```

### 3. Start development server
```bash
npm start
# Opens http://localhost:3000
# Requests to /api/* are proxied to http://localhost:8080 (set in package.json)
```

---

## API Contract (Spring Boot)

| Method | Endpoint | Used In |
|--------|----------|---------|
| POST | `/api/auth/register` | Register page |
| POST | `/api/auth/login` | Login page |
| POST | `/api/speech/upload` | Dashboard — upload only |
| POST | `/api/speech/transcribe` | Dashboard — transcribe |
| GET  | `/api/speech/history` | History page |
| GET  | `/api/speech/:id` | History page — detail |

### Expected JSON shapes

**POST /api/auth/login → response**
```json
{ "token": "eyJhbGci...", "user": { "name": "Jane", "email": "jane@example.com" } }
```
*(Also handles `accessToken` or `jwt` as the token key)*

**POST /api/speech/transcribe → response**
```json
{ "transcript": "Hello, this is the transcribed text." }
```
*(Also handles `text` or `transcription` as the key)*

**GET /api/speech/history → response**
```json
[
  { "id": 1, "audioFile": "recording.webm", "transcript": "...", "createdAt": "2024-01-15T10:30:00" }
]
```
*(Also handles Spring Page: `{ "content": [...] }` or `{ "transcriptions": [...] }`)*

---

## Project Structure

```
src/
├── context/
│   └── AuthContext.js     # JWT token management
├── hooks/
│   └── useAudioRecorder.js  # MediaRecorder hook
├── pages/
│   ├── AuthPage.js        # Login + Register
│   ├── Dashboard.js       # Upload + Record + Transcribe
│   └── HistoryPage.js     # Past transcriptions
├── services/
│   └── api.js             # All API calls
├── App.js                 # Routing
├── App.css                # All styles
└── index.js
```

---

## Deployment

### Build for production
```bash
npm run build
# Output: build/ folder — serve it as static files
```

### Vercel
```bash
npm i -g vercel
vercel --prod
# Set REACT_APP_API_URL to your backend in Vercel dashboard env vars
```

### Netlify
```bash
npm run build
# Drag & drop build/ folder to Netlify dashboard
```

### Spring Boot static hosting (serve from backend)
```bash
npm run build
cp -r build/* ../backend/src/main/resources/static/
# Spring Boot will serve the React app at /
```

---

## CORS — Spring Boot Config

Your backend must allow requests from the frontend origin:

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000", "https://your-frontend.vercel.app"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
```
