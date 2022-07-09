import Joi from "joi";

const createCardSchema = Joi.object({
    cpfEmployee: Joi.number().positive().integer().required(),
    typeCard: Joi.string()
        .valid('groceries', 'restaurants', 'transport', 'education', 'health')
        .required()
});

export default createCardSchema;