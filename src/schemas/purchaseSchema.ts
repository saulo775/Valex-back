import Joi from "joi";

export const purchaseSchema = Joi.object({
    password: Joi.string().min(4).max(4).required(),
    amount: Joi.number().positive().required()
})