import pool from "../config/db.js";

export const User = {
  // Créer un nouvel utilisateur
  createUser: async (user) => {
    try {
      const sql = `
        INSERT INTO users (name, email, password_hash, role)
        VALUES (?, ?, ?, ?)
      `;
      // role par défaut 'user' si non fourni
      const [result] = await pool.query(sql, [
        user.name,
        user.email,
        user.password_hash,
        user.role || 'user'
      ]);
      return result;
    } catch (err) {
      throw err;
    }
  },

  // Récupérer un utilisateur par email
  getUserByEmail: async (email) => {
    try {
      const sql = "SELECT * FROM users WHERE email = ?";
      const [rows] = await pool.query(sql, [email]);
      return rows[0]; // retourne un objet utilisateur ou undefined
    } catch (err) {
      throw err;
    }
  },

  // Récupérer un utilisateur par ID
  getUserById: async (id) => {
    try {
      const sql = "SELECT * FROM users WHERE id = ?";
      const [rows] = await pool.query(sql, [id]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  },

  // Lister tous les utilisateurs
  getAllUsers: async () => {
    try {
      const sql = "SELECT id, name, email, role, created_at FROM users";
      const [rows] = await pool.query(sql);
      return rows;
    } catch (err) {
      throw err;
    }
  },

  // Supprimer un utilisateur par ID
  deleteUser: async (id) => {
    try {
      const sql = "DELETE FROM users WHERE id = ?";
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (err) {
      throw err;
    }
  }
};
