import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import { purchaseSchema } from '../schemas/purchaseSchema.js';

export async function checkPurchase(
    req: Request, res: Response, next: NextFunction
) {
    const purchase = purchaseSchema.validate(req.body);

    if (purchase.error) {
        throw new AppError("input data not valid", 400);
    }
    next();
}