import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ==========================
// Middlewares globaux
// ==========================
app.use(cors({
  origin: "http://localhost:5173", // front Vite par défaut
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Route test
app.get("/", (req, res) => {
  res.send("RecettesCuisine en ligne");
});


// ==========================
// Routes
// ==========================
app.use("/api/auth", authRoutes);

// ==========================
// Test connexion MySQL
// ==========================
const testDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connecté à MySQL Dockerisé !");
    connection.release();
  } catch (error) {
    console.error("Erreur connexion MySQL :", error);
  }
};

testDB();

// ==========================
// Lancement serveur
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend démarré sur le port ${PORT}`);
});
