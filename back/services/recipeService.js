import { Recipe } from "../models/recipeModel.js";
import { Image } from "../models/imageModel.js";
import cloudinary from "../config/cloudinary.js";

export const RecipeService = {
  createRecipe: async ({ title, description, ingredients, category_id, user_id, file }) => {
    // 1️⃣ Créer la recette
    const result = await Recipe.createRecipe({ title, description, ingredients, category_id, user_id });
    const recipeId = result.insertId;

    // 2️⃣ Ajouter l'image si elle existe
    if (file) {
      await Image.addImage({
        url: file.path,
        public_id: file.filename,
        entity_type: "recipe",
        entity_id: recipeId
      });
    }

    return recipeId;
  },

  updateRecipe: async (id, { title, description, ingredients, category_id, file }) => {
    // 1️⃣ Mise à jour de la recette
    await Recipe.updateRecipe(id, { title, description, ingredients, category_id });

    // 2️⃣ Gestion de l'image
    if (file) {
      const oldImages = await Image.getImagesByEntity("recipe", id);

      for (const img of oldImages) {
        await cloudinary.uploader.destroy(img.public_id);
        await Image.deleteImage(img.public_id);
      }

      await Image.addImage({
        url: file.path,
        public_id: file.filename,
        entity_type: "recipe",
        entity_id: id
      });
    }
  },

  deleteRecipe: async (id) => {
    // Supprimer images associées
    const images = await Image.getImagesByEntity("recipe", id);
    for (const img of images) {
      await cloudinary.uploader.destroy(img.public_id);
      await Image.deleteImage(img.public_id);
    }

    // Supprimer la recette
    await Recipe.deleteRecipe(id);
  },

  getAllRecipes: async (filters, limit, offset) => {
    return await Recipe.getRecipes(filters, limit, offset);
  },

  getRecipeById: async (id) => {
    return await Recipe.getRecipeById(id);
  }
};
