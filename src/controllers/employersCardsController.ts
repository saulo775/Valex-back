import { Request, Response } from "express";
import * as employeeCardsService from "../services/employeeCardsService.js";

export async function activeCard(req: Request, res: Response) {
    const { id } = req.params;
    const { cvc, password } = req.body;

    await employeeCardsService.activateCard(id, cvc, password);

    res.sendStatus(200);
}

export async function getTransactions(req: Request, res: Response) {
    const { id } = req.params;
    const transactions = await employeeCardsService.getAllTransactions(Number(id));
    console.log(transactions);
    return res.status(200).json(transactions);
}

export async function unblockCard(req: Request, res: Response) {
    const {id} = req.params;
    const { password } = req.body;
    await employeeCardsService.unblockOneCard(Number(id), password);

    return res.sendStatus(200)
}

export async function blockCard(req: Request, res: Response) {
    const {id} = req.params;
    const { password } = req.body;
    await employeeCardsService.blockOneCard(Number(id), password);

    return res.sendStatus(200)
}
