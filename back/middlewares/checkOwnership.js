import { Recipe } from "../models/recipeModel.js";

// Permet d'indiquer : Seul le proprietaire et un admin peuvent modifier une recette.
export const checkRecipeOwner = async (req, res, next) => {
  try {
    const recipe = await Recipe.getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recette non trouvée" });

    if (recipe.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Action non autorisée" });
    }

    next();
  } catch (err) {
    console.error("Erreur checkRecipeOwner:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
