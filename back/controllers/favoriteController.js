import { Favorite } from "../models/favoriteModel.js";

// Obtenir tous les Favoris
export const getFavorites = async (req, res) => {
  try {
    const user_id = req.user.id;
    const favorites = await Favorite.getFavoritesByUser(user_id);
    res.json(favorites);
  } catch (err) {
    console.error("Erreur lors de la récupération des favoris :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Ajouter Favori
export const addFavorite = async (req, res) => {
  const user_id = req.user.id;
  const { recipe_id } = req.body;

  try {
    const exists = await Favorite.exists({ user_id, recipe_id });
    if (exists) return res.status(400).json({ message: "Recette déjà en favoris" });

    const result = await Favorite.addFavorite({ user_id, recipe_id });
    res.status(201).json({ message: "Favori ajouté", id: result.insertId });
  } catch (err) {
    console.error("Erreur lors de l'ajout du favori :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Supprimer Favori
export const removeFavorite = async (req, res) => {
  const user_id = req.user.id;
  const { recipe_id } = req.params;

  try {
    const result = await Favorite.removeFavorite({ user_id, recipe_id });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Favori non trouvé" });

    res.json({ message: "Favori supprimé" });
  } catch (err) {
    console.error("Erreur lors de la suppression du favori :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
