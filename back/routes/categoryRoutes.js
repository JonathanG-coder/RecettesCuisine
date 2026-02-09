import express from "express";
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { verifyToken, requireAuth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { categorySchema } from "../validations/categoryValidation.js";
import { upload } from "../middlewares/uploadCloudinary.js";

const router = express.Router();

// ==========================
// CRUD Categories
// ==========================

// Créer une catégorie (admin seulement + image)
router.post(
  "/",
  verifyToken,
  requireAuth(["admin"]),
  upload.single("image"),
  validate(categorySchema),
  createCategory
);

// Lister toutes les catégories
router.get("/", getAllCategories);

// Récupérer une catégorie par ID
router.get("/:id", getCategoryById);

// Modifier une catégorie (admin seulement + image)
router.put(
  "/:id",
  verifyToken,
  requireAuth(["admin"]),
  upload.single("image"),
  validate(categorySchema),
  updateCategory
);

// Supprimer une catégorie (admin seulement)
router.delete("/:id", verifyToken, requireAuth(["admin"]), deleteCategory);

export default router;
