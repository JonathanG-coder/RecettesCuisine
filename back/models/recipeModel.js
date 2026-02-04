import pool from "../config/db.js";

export const Recipe = {
  createRecipe: async ({ title, description, ingredients, category_id, user_id }) => {
    const sql = `
      INSERT INTO recipes (title, description, ingredients, category_id, user_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [title, description, ingredients, category_id, user_id]);
    return result;
  },

  getAllRecipes: async () => {
    const sql = `
      SELECT r.*, c.name AS category_name, u.name AS author
      FROM recipes r
      LEFT JOIN categories c ON r.category_id = c.id
      LEFT JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
    `;
    const [rows] = await pool.query(sql);
    return rows;
  },

  getRecipeById: async (id) => {
    const sql = `
      SELECT r.*, c.name AS category_name, u.name AS author
      FROM recipes r
      LEFT JOIN categories c ON r.category_id = c.id
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.id = ?
    `;
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
  },

  updateRecipe: async (id, { title, description, ingredients, category_id }) => {
    const sql = `
      UPDATE recipes
      SET title = ?, description = ?, ingredients = ?, category_id = ?
      WHERE id = ?
    `;
    const [result] = await pool.query(sql, [title, description, ingredients, category_id, id]);
    return result;
  },

  deleteRecipe: async (id) => {
    const sql = `DELETE FROM recipes WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result;
  }
};
