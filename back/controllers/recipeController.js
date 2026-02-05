import { Recipe } from "../models/recipeModel.js";

// ==========================
// CRÉER UNE RECETTE
// ==========================
export const createRecipe = async (req, res) => {
  const { title, description, ingredients, category_id } = req.body;
  const user_id = req.user.id; // Récupéré depuis le token JWT de l'utilisateur connecté

  try {
    const result = await Recipe.createRecipe({ title, description, ingredients, category_id, user_id });
    res.status(201).json({ message: "Recette créée avec succès", id: result.insertId });
  } catch (err) {
    console.error("Erreur lors de la création de la recette :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// RÉCUPÉRER TOUTES LES RECETTES
// ==========================
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getRecipes(filters, limit, offset)
;
    res.json(recipes);
  } catch (err) {
    console.error("Erreur lors de la récupération des recettes :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// RÉCUPÉRER UNE RECETTE PAR ID
// ==========================
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recette non trouvée" });
    res.json(recipe);
  } catch (err) {
    console.error("Erreur lors de la récupération de la recette :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// MODIFIER UNE RECETTE
// ==========================
export const updateRecipe = async (req, res) => {
  const { title, description, ingredients, category_id } = req.body;

  try {
    await Recipe.updateRecipe(req.params.id, { title, description, ingredients, category_id });
    res.json({ message: "Recette mise à jour avec succès" });
  } catch (err) {
    console.error("Erreur lors de la mise à jour de la recette :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// SUPPRIMER UNE RECETTE
// ==========================
export const deleteRecipe = async (req, res) => {
  try {
    await Recipe.deleteRecipe(req.params.id);
    res.json({ message: "Recette supprimée avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression de la recette :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
