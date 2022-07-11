import { Request, Response } from "express";

import * as employerCardsService from "../services/employerCardsService.js";

export async function activeCard(req: Request, res: Response) {
    const { id } = req.params;
    const {cvc, password} = req.body;

    await employerCardsService.activateCard(id, cvc, password);

    res.sendStatus(200);
}