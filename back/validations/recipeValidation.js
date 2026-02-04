import Joi from "joi";

export const recipeSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Le titre est requis",
      "string.min": "Le titre doit contenir au moins 2 caractères",
      "string.max": "Le titre doit contenir au maximum 100 caractères",
    }),
  description: Joi.string().allow("").optional(),
  ingredients: Joi.string().allow("").optional(),
  category_id: Joi.number().integer().required().messages({
    "number.base": "La catégorie doit être un nombre",
    "any.required": "La catégorie est requise",
  }),
});
