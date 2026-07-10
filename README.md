# 🎙️ VoiceScribe – AI-Powered Speech-to-Text Web Application

VoiceScribe is a full-stack Speech-to-Text web application that allows users to securely upload audio files or record their voice directly from the browser and convert speech into text using AI-powered transcription.

Built as part of my **Java Development Internship at Labmentix**, this project demonstrates the complete lifecycle of a modern full-stack application—from authentication and backend development to cloud deployment and containerization.

---

## 🚀 Features

### 🔐 Secure Authentication

* User Registration & Login
* JWT-based Authentication
* BCrypt Password Encryption
* Protected API Endpoints

### 🎙️ Speech-to-Text

* Upload audio files
* Record voice directly from the browser
* AI-powered transcription using Deepgram API
* Supports multiple audio formats (MP3, WAV, M4A, WEBM, OGG)

### 📜 Transcription History

* Store all previous transcriptions
* User-specific history
* Download transcripts as `.txt`
* Copy transcripts with one click

### 🎨 Modern User Interface

* Responsive React UI
* Drag & Drop File Upload
* Audio Preview
* Clean Dashboard
* Easy Navigation

---

# 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Context API
* HTML5 MediaRecorder API
* CSS3

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* Maven

### Database

* MySQL

### AI Integration

* Deepgram Speech-to-Text API

### Deployment

* Docker & Docker Compose *(Current Distribution Method)*


---

# 📸 Application Preview

> Add screenshots here

* Login Page
* Dashboard
* Voice Recording
* Audio Upload
* Generated Transcript
* History Page

---

# 📂 Project Structure

```text
VoiceScribe/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── Dockerfile
│   ├── pom.xml
│   └── application.properties
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

# 🚀 Running the Project with Docker

## Prerequisites

* Docker Desktop
* Deepgram API Key

---

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/VoiceScribe.git

cd VoiceScribe
```

---

## Configure Environment Variables

Create a `.env` file in the project root:

```env
DEEPGRAM_API_KEY=YOUR_DEEPGRAM_API_KEY

JWT_SECRET=YOUR_SECRET_KEY

SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=root
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/voicescribe

REACT_APP_API_URL=http://localhost:8080
```

---

## Start the Application

```bash
docker compose up --build
```

Docker will automatically:

✅ Start MySQL

✅ Build the Spring Boot Backend

✅ Build the React Frontend

✅ Connect all services together

---

## Access the Application

Frontend

```text
http://localhost:3000
```

Backend API

```text
http://localhost:8080
```

---

# 📖 How to Use

### 1️⃣ Create an Account

Register using your name, email, and password.

---

### 2️⃣ Login

Authenticate securely using JWT.

---

### 3️⃣ Upload or Record

Choose one of the two available options:

* Upload an audio file
* Record audio directly from your microphone

---

### 4️⃣ Generate Transcript

Click **Transcribe** and let Deepgram process your audio.

---

### 5️⃣ View History

All previous transcriptions are stored and can be viewed from the History page.

---

# 💡 Challenges Faced

This project involved much more than writing code.

Some of the real-world engineering challenges included:

* Designing secure JWT authentication
* Building REST APIs with Spring Boot
* Integrating AI-powered speech recognition
* Handling multiple audio formats
* Managing user-specific transcription history
* Deploying frontend and backend independently
* Configuring cloud-hosted MySQL databases
* Resolving CORS issues between frontend and backend
* Debugging React production build failures
* Managing environment variables across different deployment environments
* Containerizing the complete application using Docker

Each challenge helped strengthen my understanding of full-stack software engineering and real-world application deployment.

---

# 🎯 Future Improvements

* Multi-language transcription
* PDF & DOCX export
* Speaker diarization
* Real-time live transcription
* Admin dashboard
* Docker health checks
* Offline speech recognition support

---

# 👨‍💻 Author

**Swastik Basu**

Computer Science Undergraduate | Java & Full-Stack Developer

If you found this project interesting, feel free to ⭐ the repository and connect with me on LinkedIn!

---

# 📄 License

This project is licensed under the MIT License.