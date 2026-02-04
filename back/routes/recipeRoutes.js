import express from "express";
import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } from "../controllers/recipeController.js";
import { verifyToken, requireAuth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { recipeSchema } from "../validations/recipeValidation.js";

const router = express.Router();

// ==========================
// CRUD Recipes
// ==========================

// Créer une recette (connecté)
router.post("/", verifyToken, validate(recipeSchema), createRecipe);

// Lister toutes les recettes
router.get("/", getAllRecipes);

// Récupérer une recette par ID
router.get("/:id", getRecipeById);

// Modifier une recette (connecté et propriétaire ou admin)
router.put("/:id", verifyToken, validate(recipeSchema), updateRecipe);

// Supprimer une recette (connecté et propriétaire ou admin)
router.delete("/:id", verifyToken, deleteRecipe);

export default router;
