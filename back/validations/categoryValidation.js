import Joi from "joi";

// ==========================
// CREATE / UPDATE CATEGORY VALIDATION
// ==========================
export const categorySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Le nom de la catégorie est requis",
      "string.min": "Le nom doit contenir au moins 2 caractères",
      "string.max": "Le nom doit contenir au maximum 50 caractères",
    }),
  description: Joi.string()
    .allow("")
    .optional()
    .messages({
      "string.base": "La description doit être une chaîne de caractères",
    }),
});
