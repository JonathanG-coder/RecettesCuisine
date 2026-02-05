import pool from "../config/db.js";

export const Image = {
  addImage: async ({ url, public_id, entity_type, entity_id }) => {
    const sql = `INSERT INTO images (url, public_id, entity_type, entity_id) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [url, public_id, entity_type, entity_id]);
    return result;
  },

  getImagesByEntity: async (entity_type, entity_id) => {
    const sql = `SELECT * FROM images WHERE entity_type = ? AND entity_id = ? ORDER BY created_at DESC`;
    const [rows] = await pool.query(sql, [entity_type, entity_id]);
    return rows;
  },

  deleteImage: async (public_id) => {
    const sql = `DELETE FROM images WHERE public_id = ?`;
    const [result] = await pool.query(sql, [public_id]);
    return result;
  },

  getImageById: async (id) => {
    const sql = `SELECT * FROM images WHERE id = ?`;
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
  },
};
