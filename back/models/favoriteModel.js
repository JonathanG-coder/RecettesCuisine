import pool from "../config/db.js";

export const Favorite = {
  // ==========================
  // GET ALL FAVORITES OF A USER
  // ==========================
  getFavoritesByUser: async (user_id) => {
    const sql = `
      SELECT f.id, r.id AS recipe_id, r.title, r.description, r.ingredients, c.name AS category_name, u.name AS author
      FROM favorites f
      JOIN recipes r ON f.recipe_id = r.id
      LEFT JOIN categories c ON r.category_id = c.id
      LEFT JOIN users u ON r.user_id = u.id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC
    `;
    const [rows] = await pool.query(sql, [user_id]);
    return rows;
  },

  // ==========================
  // ADD FAVORITE
  // ==========================
  addFavorite: async ({ user_id, recipe_id }) => {
    const sql = `INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)`;
    const [result] = await pool.query(sql, [user_id, recipe_id]);
    return result;
  },

  // ==========================
  // REMOVE FAVORITE
  // ==========================
  removeFavorite: async ({ user_id, recipe_id }) => {
    const sql = `DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?`;
    const [result] = await pool.query(sql, [user_id, recipe_id]);
    return result;
  },

  // ==========================
  // CHECK IF FAVORITE EXISTS
  // ==========================
  exists: async ({ user_id, recipe_id }) => {
    const sql = `SELECT * FROM favorites WHERE user_id = ? AND recipe_id = ?`;
    const [rows] = await pool.query(sql, [user_id, recipe_id]);
    return rows.length > 0;
  },
};
