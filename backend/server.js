import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import OpenAI from "openai";
import openrouterReportService from "./services/openrouterReportService.js";

// Load env variables
dotenv.config();

const app = express();

/* -------------------- BASIC MIDDLEWARE -------------------- */

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "mindfusion-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true only in HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

/* -------------------- PASSPORT SETUP -------------------- */

import "./Passport.js";

app.use(passport.initialize());
app.use(passport.session());

/* -------------------- GOOGLE AUTH ROUTES -------------------- */

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    // Successful login
    res.redirect("http://localhost:5173/dashboard");
  }
);

/* -------------------- AUTH CHECK -------------------- */

app.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5173");
  });
});

/* -------------------- AI CHATBOT API -------------------- */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, emotion } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are MindFusion AI, a supportive and empathetic mental health assistant.
User current emotion: ${emotion || "neutral"}.
Respond calmly, positively, and without giving medical diagnosis.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      reply: "Sorry, I’m having trouble responding right now.",
    });
  }
});

/* -------------------- DOCTOR-STYLE REPORT (OpenRouter) -------------------- */

app.post("/api/report/doctor", async (req, res) => {
  try {
    const { emotionHistory, currentEmotion, patientInfo } = req.body;
    const report = await openrouterReportService.generateDoctorReport({ emotionHistory, currentEmotion, patientInfo });
    res.json({ report });
  } catch (err) {
    console.error("Doctor report error:", err);
    res.status(500).json({ error: "Doctor report generation failed" });
  }
});

/* -------------------- HEALTH CHECK -------------------- */

app.get("/", (req, res) => {
  res.send("MindFusion backend is running 🚀");
});

/* -------------------- SERVER START -------------------- */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
