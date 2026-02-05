import { RecipeService } from "../services/recipeService.js";

// ==========================
// Créer une recette (avec image)
export const createRecipe = async (req, res) => {
  const { title, description, ingredients, category_id } = req.body;
  const user_id = req.user.id; // récupéré depuis JWT

  try {
    const recipeId = await RecipeService.createRecipe({
      title,
      description,
      ingredients,
      category_id,
      user_id,
      file: req.file, // Multer + Cloudinary
    });

    res.status(201).json({ message: "Recette créée avec succès", id: recipeId });
  } catch (err) {
    console.error("Erreur createRecipe:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// Récupérer toutes les recettes
export const getAllRecipes = async (req, res) => {
  const filters = {
    category_id: req.query.category_id || null,
    user_id: req.query.user_id || null,
    search: req.query.search || null,
  };

  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;

  try {
    const recipes = await RecipeService.getAllRecipes(filters, limit, offset);
    res.json(recipes);
  } catch (err) {
    console.error("Erreur getAllRecipes:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// Récupérer une recette par ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await RecipeService.getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recette non trouvée" });
    res.json(recipe);
  } catch (err) {
    console.error("Erreur getRecipeById:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// Modifier une recette (avec image)
export const updateRecipe = async (req, res) => {
  const { title, description, ingredients, category_id } = req.body;

  try {
    await RecipeService.updateRecipe(req.params.id, {
      title,
      description,
      ingredients,
      category_id,
      file: req.file, // Multer + Cloudinary
    });

    res.json({ message: "Recette mise à jour avec succès" });
  } catch (err) {
    console.error("Erreur updateRecipe:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// Supprimer une recette
export const deleteRecipe = async (req, res) => {
  try {
    await RecipeService.deleteRecipe(req.params.id);
    res.json({ message: "Recette supprimée avec succès" });
  } catch (err) {
    console.error("Erreur deleteRecipe:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
