import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import { amountSchema } from '../schemas/amountSchema.js';

export async function checkAmount(
    req: Request, res: Response, next: NextFunction
) {
    const amount = amountSchema.validate(req.body);

    if (amount.error) {
        throw new AppError("input data not valid", 400);
    }
    next();
}