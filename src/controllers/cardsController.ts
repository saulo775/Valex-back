import { Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import * as cardsService from "../services/cardService.js";

export async function cardsController(req: Request, res: Response) {
    const { cpfEmployee, typeCard } = req.body;
    const keyCompany = req.headers['x-api-key'];
    
    await cardsService.createCard(cpfEmployee, typeCard, keyCompany);

    res.sendStatus(201);
}