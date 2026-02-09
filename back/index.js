import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import pool from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

dotenv.config();

const app = express();

import bcrypt from "bcrypt";


// ==========================
// Middlewares globaux
// ==========================
app.use(helmet()); // sécurité HTTP headers
app.use(cors({
  origin: "http://localhost:5173", // front Vite
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ==========================
// Route test
// ==========================
app.get("/", (req, res) => {
  res.send("RecettesCuisine en ligne");
});

// ==========================
// Routes API
// ==========================
app.use("/api/auth", authRoutes);         // Authentification / utilisateurs
app.use("/api/recipes", recipeRoutes);   // Recettes CRUD
app.use("/api/categories", categoryRoutes); // Catégories CRUD
app.use("/api/favorites", favoriteRoutes);  // Favoris
app.use("/api/images", imageRoutes);        // image

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
