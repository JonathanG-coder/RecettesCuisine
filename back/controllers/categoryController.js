import { Category } from "../models/categoryModel.js";

// Créer une catégorie
export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await Category.createCategory({ name, description });
    res.status(201).json({ message: "Catégorie créée", id: result.insertId });
  } catch (err) {
    console.error("Erreur createCategory:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Lister toutes les catégories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.json(categories);
  } catch (err) {
    console.error("Erreur getAllCategories:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer une catégorie par ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });
    res.json(category);
  } catch (err) {
    console.error("Erreur getCategoryById:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Modifier une catégorie
export const updateCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    await Category.updateCategory(req.params.id, { name, description });
    res.json({ message: "Catégorie mise à jour" });
  } catch (err) {
    console.error("Erreur updateCategory:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  try {
    await Category.deleteCategory(req.params.id);
    res.json({ message: "Catégorie supprimée" });
  } catch (err) {
    console.error("Erreur deleteCategory:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
