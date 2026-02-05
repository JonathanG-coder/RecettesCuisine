import express from "express";
import { getFavorites, addFavorite, removeFavorite } from "../controllers/favoriteController.js";
import { verifyToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { favoriteSchema } from "../validations/favoriteValidation.js";

const router = express.Router();

// Toutes les routes nécessitent un utilisateur connecté
router.use(verifyToken);

// Lister les favoris
router.get("/", getFavorites);

// Ajouter un favori
router.post("/", validate(favoriteSchema), addFavorite);

// Supprimer un favori
router.delete("/:recipe_id", removeFavorite);

export default router;
