import { FavoriteService } from "../services/favoriteService.js";

// Obtenir tous les favoris
export const getFavorites = async (req, res) => {
  try {
    const user_id = req.user.id;
    const favorites = await FavoriteService.getFavorites(user_id);
    res.json(favorites);
  } catch (err) {
    console.error("Erreur getFavorites:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Ajouter un favori
export const addFavorite = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { recipe_id } = req.body;

    const favoriteId = await FavoriteService.addFavorite({
      user_id,
      recipe_id,
    });

    res.status(201).json({
      message: "Favori ajouté",
      id: favoriteId,
    });
  } catch (err) {
    console.error("Erreur addFavorite:", err);

    if (err.message === "ALREADY_EXISTS") {
      return res.status(400).json({
        message: "Recette déjà en favoris",
      });
    }

    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Supprimer favori
export const removeFavorite = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { recipe_id } = req.params;

    const removed = await FavoriteService.removeFavorite({
      user_id,
      recipe_id,
    });

    if (!removed) {
      return res.status(404).json({
        message: "Favori non trouvé",
      });
    }

    res.json({ message: "Favori supprimé" });
  } catch (err) {
    console.error("Erreur removeFavorite:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
