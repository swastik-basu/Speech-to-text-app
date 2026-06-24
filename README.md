# 🎙️ VoiceScribe - Speech to Text Application

VoiceScribe is a full-stack Speech-to-Text web application that allows users to upload audio files or record audio directly from their browser and convert speech into text using AI-powered transcription services.

The application features secure JWT-based authentication, transcription history management, and a modern responsive user interface.

---

## ✨ Features

### 🔐 Authentication & Security

* User Registration
* User Login
* JWT-Based Authentication
* Password Encryption using BCrypt
* Protected Routes

### 🎙️ Audio Transcription

* Upload Audio Files
* Record Audio Directly from Browser
* Speech-to-Text Conversion
* Support for Multiple Audio Formats
* Real-Time Recording Interface

### 📜 History Management

* Store Previous Transcriptions
* View Transcription History
* User-Specific Records
* Persistent Database Storage

### 🎨 Modern UI

* Responsive Design
* Clean Dashboard Interface
* Drag-and-Drop File Upload
* Audio Preview Support
* Download Transcripts
* Copy Transcript to Clipboard

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Context API
* HTML5 Audio APIs
* CSS3

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* Maven


### External Services

* Deepgram Speech-to-Text API

---

## 📂 Project Structure

```text
speech-to-text-app/
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   │
│   └── public/
│
└── backend/
    ├── controller/
    ├── service/
    ├── repository/
    ├── entity/
    ├── security/
    ├── config/
    └── dto/
```

---

## 🔧 Installation

### Clone Repository

```bash
git clone https://github.com/your-username/speech-to-text-app.git
```

### Backend Setup

```bash
cd backend
```

Configure application.properties:

```properties
spring.datasource.url=YOUR_DATABASE_URL
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

jwt.secret=YOUR_SECRET
deepgram.api.key=YOUR_API_KEY
```

Run the application:

```bash
mvn spring-boot:run
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create .env:

```env
REACT_APP_API_URL=http://localhost:8080
```

Start frontend:

```bash
npm start
```

---

## 🔑 Environment Variables

### Backend

```env
DB_URL=
DB_USERNAME=
DB_PASSWORD=
JWT_SECRET=
DEEPGRAM_API_KEY=
```

### Frontend

```env
REACT_APP_API_URL=
```

---

## 📈 Future Enhancements

* Multi-language Transcription
* Export to PDF
* Export to DOCX
* Speaker Identification
* Real-Time Streaming Transcription
* Audio Editing Tools
* Admin Dashboard
* Cloud Storage Integration

---

# 🎙️ How to Use VoiceScribe

Getting started with VoiceScribe is simple and takes less than a minute!

## Step 1: Create an Account

* Open the application.
* Click **Create Account**.
* Enter your name, email, and password.
* Register and log in securely.

If you already have an account, simply sign in using your credentials.

---

## Step 2: Choose How You Want to Transcribe

VoiceScribe offers two ways to convert speech into text:

### 📁 Option 1: Upload an Audio File

1. Navigate to the **Upload File** tab.
2. Drag and drop your audio file or click to browse.
3. Supported formats include:

   * MP3
   * WAV
   * M4A
   * WEBM
   * OGG
4. Click **Transcribe**.

Within seconds, your transcript will appear on the screen.

---

### 🎙️ Option 2: Record Your Voice

1. Switch to the **Record Voice** tab.
2. Click the record button and start speaking.
3. When finished, stop the recording.
4. Click **Transcribe**.

VoiceScribe will process your recording and generate the transcript automatically.

---

## Step 3: View Your Transcript

Once transcription is complete, you can:

* Read the generated text instantly.
* Copy the transcript to your clipboard.
* Download the transcript as a text file.
* Save it for future reference.

---

## Step 4: Access Your History

Every transcription is stored securely in your account.

Visit the **History** page to:

* View previous transcriptions.
* Track your past uploads and recordings.
* Revisit important notes whenever needed.

---

## Why Use VoiceScribe?

Whether you're a student, content creator, researcher, professional, or someone who simply prefers speaking over typing, VoiceScribe helps transform audio into readable text quickly and efficiently.

No complicated setup. No technical knowledge required.

Just upload, transcribe, and use your text.


## 👨‍💻 Author

Swastik Basu

Computer Science Student | Java Developer | Full-Stack Developer

---

## 📄 License

This project is open-source and available under the MIT License.
