import { Favorite } from "../models/favoriteModel.js";

export const FavoriteService = {
  getFavorites: async (user_id) => {
    return await Favorite.getFavoritesByUser(user_id);
  },

  addFavorite: async ({ user_id, recipe_id }) => {
    const exists = await Favorite.exists({ user_id, recipe_id });

    if (exists) {
      throw new Error("ALREADY_EXISTS");
    }

    const result = await Favorite.addFavorite({
      user_id,
      recipe_id,
    });

    return result.insertId;
  },

  removeFavorite: async ({ user_id, recipe_id }) => {
    const result = await Favorite.removeFavorite({
      user_id,
      recipe_id,
    });

    return result.affectedRows > 0;
  },
};
