import express from "express";
import rateLimit from "express-rate-limit";
import { register, loginUser, deleteUser, logoutUser, getMe, uploadAvatar } from "../controllers/authController.js";
import { verifyToken, requireAuth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validations/authValidation.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// ==========================
// Rate limiter pour login
// ==========================
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                  // 10 tentatives max par IP
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { message: "Trop de tentatives de connexion. Réessayez dans 15 minutes." },
});

// ==========================
// Routes utilisateurs
// ==========================

// 1️⃣ Inscription publique
router.post("/register", validate(registerSchema), register);

// 2️⃣ Créer un utilisateur (admin seulement, rôle choisi)
router.post(
  "/",
  verifyToken,
  requireAuth(["admin"]),
  validate(registerSchema),
  register
);

// Connexion (login) avec rate-limit et validation
router.post("/login", loginLimiter, validate(loginSchema), loginUser);

// Déconnexion
router.post("/logout", logoutUser);

// Récupérer l'utilisateur connecté
router.get("/me", verifyToken, getMe);

// Route pour mettre à jour l'avatar
router.put(
  "/me/avatar",
  verifyToken,
  upload.single("avatar"),
  uploadAvatar
);

// Supprimer un utilisateur (admin seulement)
router.delete("/:id", verifyToken, requireAuth(["admin"]), deleteUser);

// ==========================
// Route admin protégée (exemple)
router.get(
  "/admin/dashboard",
  verifyToken,
  requireAuth(["admin"]),
  (req, res) => {
    res.json({ message: `Bienvenue ${req.user.email}, dashboard admin.` });
  }
);

export default router;
