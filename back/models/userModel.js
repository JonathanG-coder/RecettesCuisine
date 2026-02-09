import pool from "../config/db.js";

export const User = {
  // Créer un nouvel utilisateur
  createUser: async (user) => {
    try {
      const sql = `
        INSERT INTO users (name, email, password_hash, role)
        VALUES (?, ?, ?, ?)
      `;

      const [result] = await pool.query(sql, [
        user.name,
        user.email,
        user.password_hash,
        user.role || "user",
      ]);

      return result;
    } catch (err) {
      throw err;
    }
  },

  // Récupérer un utilisateur par email (pour login)
  getUserByEmail: async (email) => {
    try {
      const sql = `
        SELECT *
        FROM users
        WHERE email = ?
      `;

      const [rows] = await pool.query(sql, [email]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  },

  // Récupérer un utilisateur par ID avec avatar
  getUserById: async (id) => {
    try {
      const sql = `
        SELECT 
          u.id,
          u.name,
          u.email,
          u.role,
          u.created_at,
          i.url AS avatar_url
        FROM users u
        LEFT JOIN images i
          ON i.entity_type = 'user'
          AND i.entity_id = u.id
        WHERE u.id = ?
      `;

      const [rows] = await pool.query(sql, [id]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  },

  // Lister tous les utilisateurs avec avatar
  getAllUsers: async () => {
    try {
      const sql = `
        SELECT 
          u.id,
          u.name,
          u.email,
          u.role,
          u.created_at,
          i.url AS avatar_url
        FROM users u
        LEFT JOIN images i
          ON i.entity_type = 'user'
          AND i.entity_id = u.id
        ORDER BY u.created_at DESC
      `;

      const [rows] = await pool.query(sql);
      return rows;
    } catch (err) {
      throw err;
    }
  },

  // Supprimer un utilisateur
  deleteUser: async (id) => {
    try {
      const sql = `DELETE FROM users WHERE id = ?`;
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (err) {
      throw err;
    }
  },
};
