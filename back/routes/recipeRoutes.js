import express from "express";
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} from "../controllers/recipeController.js";

import { verifyToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { recipeSchema } from "../validations/recipeValidation.js";
import { checkRecipeOwner } from "../middlewares/checkOwnership.js";
import { upload } from "../middlewares/uploadCloudinary.js";

const router = express.Router();

// ==========================
// CRUD Recettes
// ==========================

// Créer une recette (connecté + image)
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  validate(recipeSchema),
  createRecipe
);

// Lister toutes les recettes
router.get("/", getAllRecipes);

// Récupérer une recette par ID
router.get("/:id", getRecipeById);

// Modifier une recette (connecté + propriétaire/admin + image)
router.put(
  "/:id",
  verifyToken,
  checkRecipeOwner,
  upload.single("image"),
  validate(recipeSchema),
  updateRecipe
);

// Supprimer une recette (connecté + propriétaire/admin)
router.delete("/:id", verifyToken, checkRecipeOwner, deleteRecipe);

export default router;
