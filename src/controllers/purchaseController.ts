import { Request, Response } from "express";
import { saveNewPurchase } from "../services/purchaseService.js";

export async function newPurchase(req: Request, res: Response) {
    const {cardId, storeId} = req.params;
    const {password, amount} = req.body;

    const purchaseData = {
        cardId: Number(cardId),
        storeId: Number(storeId),
        password,
        amount
    }

    
    await saveNewPurchase(purchaseData);
    res.sendStatus(200);
}
