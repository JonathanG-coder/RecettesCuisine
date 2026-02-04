import { User } from "../models/userModel.js";
import { signToken, verifyTokenUtil } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

// ==========================
// REGISTER
// ==========================
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    const hashedPassword = await hashPassword(password);

    const result = await User.createUser({
      name,
      email,
      password_hash: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      id: result.insertId,
    });

  } catch (err) {
    console.error("Erreur register:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// LOGIN
// ==========================
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.getUserByEmail(email);

    if (!user || !(await comparePassword(password, user.password_hash))) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true en prod HTTPS
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("Erreur login:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// DELETE USER
// ==========================
export const deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    console.error("Erreur deleteUser:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ==========================
// LOGOUT
// ==========================
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.json({ message: "Déconnexion réussie" });
};

// ==========================
// CURRENT USER
// ==========================
export const getMe = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Non connecté" });

    const decoded = verifyTokenUtil(token);
    res.json({ user: decoded });

  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
  }
};
