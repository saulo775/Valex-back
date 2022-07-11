import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import activateCardSchema from '../schemas/activateCardSchema.js';
import createCardSchema from '../schemas/createCardSchema.js';

export function validateCardInfos(req: Request, res: Response, next: NextFunction) {
    const validateData = createCardSchema.validate(req.body);

    if (validateData.error) {
        throw new AppError("input data not valid", 400);
    }
    next();
}

export function validateActivateCardInfo(req: Request, res: Response, next: NextFunction) {
    const validateData = activateCardSchema.validate(req.body);

    if (validateData.error) {
        throw new AppError("input data not valid", 400);
    }
    next();
}