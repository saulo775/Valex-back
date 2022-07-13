import { Request, Response } from "express";
import * as cardsService from "../services/cardService.js";

export async function cardsController(req: Request, res: Response) {
    const { cpfEmployee, typeCard } = req.body;
    const keyCompany = req.headers['x-api-key'];
    
    const card = await cardsService.createCard(cpfEmployee, typeCard, keyCompany);
    console.log("chegou")
    res.status(201).json({cvc: card});
}