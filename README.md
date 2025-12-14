# MindFuse 🧠✨  
**AI-Powered Emotion Detection & Mental Wellness Platform**

MindFuse is a full-stack AI-based web application that performs **real-time facial emotion detection** and provides **emotion-aware insights and chatbot support**.  
It is designed to support **mental health awareness, education engagement, interviews, and behavioral analysis**.

---

## 🚀 Features

- 🎭 **Real-time Facial Emotion Detection**
- 🤖 **AI Chatbot with Emotion-Aware Responses**
- 🔐 **Google Authentication (OAuth 2.0)**
- 📊 **Interactive Dashboard & Analytics**
- ⚡ **Modern UI with Vite + React**
- 🌐 **Secure Backend with Node.js & Express**

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack React Query

### Backend
- Node.js
- Express.js
- Passport.js (Google OAuth)
- OpenAI API (AI Chatbot)
- OpenRouter API (Clinician-style reports - optional)
- dotenv

---

## 🏗️ System Architecture


Frontend (React + Vite)
|
| REST APIs
↓
Backend (Node.js + Express)
|
| AI Processing
↓
AI Services (Emotion Detection + Chatbot)


---

## 🔑 Authentication

- Google OAuth 2.0 for secure login
- Session-based authentication using Passport.js

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/vinayakpandeycode/MindFuse2.git
cd MindFuse

2️⃣ Frontend Setup
npm install
npm run dev


Frontend runs on:

http://localhost:5173

3️⃣ Backend Setup
cd backend
npm install
node server.js

Optional: Clinician-Style Reports (OpenRouter or Direct OpenAI from client)

- Add `OPENROUTER_API_KEY` to your backend environment to enable `POST /api/report/doctor` which accepts `{ emotionHistory, currentEmotion, patientInfo? }` and returns a clinician-friendly structured report. The report includes `clinicalSummary`, `timeline`, `dominantEmotions`, `observations`, `suggestions`, `limitations`, and `recommendedFollowUp`.

- (Developer mode) You can also enable direct client-side OpenAI calls for rapid iterations (INSECURE — exposes API key in browser). To enable:
  - Set `VITE_ALLOW_CLIENT_OPENAI=true` and `VITE_OPENAI_KEY=sk-...` in your frontend env. The Report Generator will then call OpenAI directly instead of the backend.
  - Warning: Do NOT use client-side keys in production; prefer server-side requests for security.

