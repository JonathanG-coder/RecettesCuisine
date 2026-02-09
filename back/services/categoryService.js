import { Category } from "../models/categoryModel.js";
import { Image } from "../models/imageModel.js";
import cloudinary from "../config/cloudinary.js";

export const CategoryService = {
  createCategory: async ({ name, description, file }) => {
    const result = await Category.createCategory({ name, description });
    const categoryId = result.insertId;

    if (file) {
      await Image.addImage({
        url: file.path,
        public_id: file.filename,
        entity_type: "category",
        entity_id: categoryId
      });
    }

    return categoryId;
  },

  updateCategory: async (id, { name, description, file }) => {
    await Category.updateCategory(id, { name, description });

    if (file) {
      const oldImages = await Image.getImagesByEntity("category", id);
      for (const img of oldImages) {
        await cloudinary.uploader.destroy(img.public_id);
        await Image.deleteImage(img.public_id);
      }

      await Image.addImage({
        url: file.path,
        public_id: file.filename,
        entity_type: "category",
        entity_id: id
      });
    }
  },

  deleteCategory: async (categoryId) => {
    const images = await Image.getImagesByEntity("category", categoryId);
    for (const img of images) {
      await cloudinary.uploader.destroy(img.public_id);
      await Image.deleteImage(img.public_id);
    }

    await Category.deleteCategory(categoryId);
  },

  getAllCategories: async () => {
    return await Category.getAllCategories();
  },

  getCategoryById: async (id) => {
    return await Category.getCategoryById(id);
  }
};
