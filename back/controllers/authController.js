import { UserService } from "../services/userService.js";

// ==========================
// REGISTER
export const register = async (req, res) => {
  try {
    const userId = await UserService.register(req.body);
    res.status(201).json({ message: "Utilisateur créé avec succès", id: userId });
  } catch (err) {
    console.error("Erreur register:", err);
    res.status(400).json({ message: err.message });
  }
};

// ==========================
// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { user, token } = await UserService.login(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Connexion réussie",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Erreur login:", err);
    res.status(401).json({ message: err.message });
  }
};

// ==========================
// LOGOUT
export const logoutUser = (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "lax" });
  res.json({ message: "Déconnexion réussie" });
};

// ==========================
// GET ME
export const getMe = (req, res) => {
  res.json({ user: req.user });
};

// ==========================
// UPLOAD AVATAR
export const uploadAvatar = async (req, res) => {
  try {
    console.log("===== DEBUG AVATAR UPLOAD =====");
    console.log("Utilisateur connecté (req.user):", req.user);
    console.log("Entity Type (req.body.entity_type):", req.body.entity_type);
    console.log("Fichier uploadé (req.file):", req.file);
    console.log("================================");
    
    await UserService.uploadAvatar(req.user.id, req.file);
    res.json({ message: "Avatar mis à jour" });
  } catch (err) {
    console.error("Erreur uploadAvatar:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ==========================
// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    console.error("Erreur deleteUser:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
