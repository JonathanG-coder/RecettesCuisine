import Joi from "joi";

export const favoriteSchema = Joi.object({
  recipe_id: Joi.number().integer().required().messages({
    "number.base": "L'ID de la recette doit être un nombre",
    "any.required": "L'ID de la recette est requis",
  }),
});
