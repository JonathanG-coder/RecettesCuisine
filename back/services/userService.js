import { User } from "../models/userModel.js";
import { Image } from "../models/imageModel.js";
import cloudinary from "../config/cloudinary.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";

export const UserService = {
  register: async ({ name, email, password, role }) => {
    const existingUser = await User.getUserByEmail(email);
    if (existingUser) throw new Error("Email déjà utilisé");

    const hashedPassword = await hashPassword(password);

    const result = await User.createUser({
      name,
      email,
      password_hash: hashedPassword,
      role,
    });

    return result.insertId;
  },

  login: async ({ email, password }) => {
    const user = await User.getUserByEmail(email);
    if (!user) throw new Error("Email ou mot de passe incorrect");

    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) throw new Error("Email ou mot de passe incorrect");

    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { password_hash, ...safeUser } = user;
    return { user: safeUser, token };

  },

  uploadAvatar: async (userId, file) => {
    if (!file) return;

    // Supprimer ancien avatar
    const oldImages = await Image.getImagesByEntity("user", userId);
    for (const img of oldImages) {
      await cloudinary.uploader.destroy(img.public_id);
      await Image.deleteImage(img.public_id);
    }

    // Ajouter le nouvel avatar
    await Image.addImage({
      url: file.path,
      public_id: file.filename,
      entity_type: "user",
      entity_id: userId,
    });
  },

  deleteUser: async (userId) => {
    // Supprimer avatar si existe
    const oldImages = await Image.getImagesByEntity("user", userId);
    for (const img of oldImages) {
      await cloudinary.uploader.destroy(img.public_id);
      await Image.deleteImage(img.public_id);
    }

    // Supprimer utilisateur
    await User.deleteUser(userId);
  },

  getAllUsers: async () => {
    return await User.getAllUsers();
  },

  getUserById: async (id) => {
    return await User.getUserById(id);
  }
};
