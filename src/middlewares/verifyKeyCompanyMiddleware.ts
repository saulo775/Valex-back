import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

export async function verifyKeyCompany(
    req: Request, res: Response, next: NextFunction
) {
    const keyCompany = req.headers['x-api-key'];

    if (!keyCompany) {
        throw new AppError("input data not valid", 400);
    }
    next();
}