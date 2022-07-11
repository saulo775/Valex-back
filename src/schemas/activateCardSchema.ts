import Joi from "joi";

const activateCardSchema = Joi.object({
    password: Joi.string().min(4).max(4).required(),
    cvc: Joi.number().positive().integer().min(3).required()
});

export default activateCardSchema;