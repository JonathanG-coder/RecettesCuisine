import Joi from "joi";

// ==========================
// REGISTER VALIDATION
// ==========================
export const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Le nom est requis",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email invalide",
      "string.empty": "Email requis",
    }),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.min": "Mot de passe trop court (8 caractères minimum)",
      "string.empty": "Mot de passe requis",
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Les mots de passe ne correspondent pas",
    }),

  role: Joi.string()
    .valid("user", "admin", "gerante")
    .optional(),
});

// ==========================
// LOGIN VALIDATION
// ==========================
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email invalide",
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Mot de passe requis",
    }),
});
