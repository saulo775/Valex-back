import { Request, Response } from "express";
import * as cardService from  "../services/employeeCardsService.js";

export async function rechargeCard(req: Request, res: Response) {
    const {id} = req.params;
    const keyCompany = req.headers['x-api-key'];
    const {amount} = req.body;

    cardService.rechargeOneCard(Number(id), String(keyCompany), amount);

    res.sendStatus(201);
}