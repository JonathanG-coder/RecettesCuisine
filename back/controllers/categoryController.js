import { CategoryService } from "../services/categoryService.js";

// ==========================
// Créer une catégorie (avec image)
export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const categoryId = await CategoryService.createCategory({
      name,
      description,
      file: req.file, // Multer + Cloudinary
    });

    res.status(201).json({ message: "Catégorie créée", id: categoryId });
  } catch (err) {
    console.error("Erreur createCategory:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// Lister toutes les catégories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
  } catch (err) {
    console.error("Erreur getAllCategories:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// Récupérer une catégorie par ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });
    res.json(category);
  } catch (err) {
    console.error("Erreur getCategoryById:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// Modifier une catégorie (avec image)
export const updateCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    await CategoryService.updateCategory(req.params.id, {
      name,
      description,
      file: req.file, // Multer + Cloudinary
    });
    res.json({ message: "Catégorie mise à jour" });
  } catch (err) {
    console.error("Erreur updateCategory:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  try {
    await CategoryService.deleteCategory(req.params.id);
    res.json({ message: "Catégorie supprimée" });
  } catch (err) {
    console.error("Erreur deleteCategory:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
