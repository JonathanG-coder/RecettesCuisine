import pool from "../config/db.js";

export const Recipe = {

  // Créer une recette
  createRecipe: async ({ title, description, ingredients, category_id, user_id }) => {
    const sql = `
      INSERT INTO recipes (title, description, ingredients, category_id, user_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [
      title,
      description,
      ingredients,
      category_id,
      user_id,
    ]);

    return result;
  },

  // GET RECIPES WITH FILTERS + PAGINATION + IMAGE
  getRecipes: async (filters, limit, offset) => {
    let sql = `
      SELECT r.*, c.name AS category_name, u.name AS author,
             i.url AS image_url
      FROM recipes r
      LEFT JOIN categories c ON r.category_id = c.id
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN images i ON i.entity_type='recipe' AND i.entity_id = r.id
      WHERE 1=1
    `;

    const values = [];

    if (filters.category_id) {
      sql += " AND r.category_id = ?";
      values.push(filters.category_id);
    }

    if (filters.user_id) {
      sql += " AND r.user_id = ?";
      values.push(filters.user_id);
    }

    if (filters.search) {
      sql += " AND r.title LIKE ?";
      values.push(`%${filters.search}%`);
    }

    sql += " ORDER BY r.created_at DESC LIMIT ? OFFSET ?";
    values.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(sql, values);
    return rows;
  },

// Obtenir une recette
  getRecipeById: async (id) => {
    const sql = `
      SELECT r.*, c.name AS category_name, u.name AS author,
             i.url AS image_url
      FROM recipes r
      LEFT JOIN categories c ON r.category_id = c.id
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN images i ON i.entity_type='recipe' AND i.entity_id = r.id
      WHERE r.id = ?
    `;
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
  },

// Telecharger une recette
  updateRecipe: async (id, { title, description, ingredients, category_id }) => {
    const sql = `
      UPDATE recipes
      SET title = ?, description = ?, ingredients = ?, category_id = ?, updated_at = NOW()
      WHERE id = ?
    `;
    const [result] = await pool.query(sql, [
      title,
      description,
      ingredients,
      category_id,
      id,
    ]);

    return result;
  },

// Supprimer une recette
  deleteRecipe: async (id) => {
    const sql = `DELETE FROM recipes WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result;
  },
};
