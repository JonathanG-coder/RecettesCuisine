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


// Middlewares globaux
app.use(helmet());


const allowedOrigins = [
  process.env.FRONTEND_URL_WEB,
  process.env.FRONTEND_URL_MOBILE
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());


// Route test
app.get("/", (req, res) => {
  res.send("RecettesCuisine en ligne");
});


// Routes API
app.use("/api/auth", authRoutes);         // Authentification / utilisateurs
app.use("/api/recipes", recipeRoutes);   // Recettes
app.use("/api/categories", categoryRoutes); // Catégories
app.use("/api/favorites", favoriteRoutes);  // Favoris
app.use("/api/images", imageRoutes);        // image



// Test connexion MySQL
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


// Lancement serveur
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend démarré sur le port ${PORT}`);
});
