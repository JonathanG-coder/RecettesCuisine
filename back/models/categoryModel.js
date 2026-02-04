import pool from "../config/db.js";

export const Category = {
  createCategory: async ({ name, description }) => {
    try {
      const sql = "INSERT INTO categories (name, description) VALUES (?, ?)";
      const [result] = await pool.query(sql, [name, description]);
      return result;
    } catch (err) {
      throw err;
    }
  },

  getAllCategories: async () => {
    try {
      const sql = "SELECT * FROM categories ORDER BY name";
      const [rows] = await pool.query(sql);
      return rows;
    } catch (err) {
      throw err;
    }
  },

  getCategoryById: async (id) => {
    try {
      const sql = "SELECT * FROM categories WHERE id = ?";
      const [rows] = await pool.query(sql, [id]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  },

  updateCategory: async (id, { name, description }) => {
    try {
      const sql = "UPDATE categories SET name = ?, description = ? WHERE id = ?";
      const [result] = await pool.query(sql, [name, description, id]);
      return result;
    } catch (err) {
      throw err;
    }
  },

  deleteCategory: async (id) => {
    try {
      const sql = "DELETE FROM categories WHERE id = ?";
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (err) {
      throw err;
    }
  },
};
