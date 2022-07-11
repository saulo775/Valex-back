import { Router } from "express";

import { activeCard, getTransactions, unblockCard } from "../controllers/employersCardsController.js";
import { validateActivateCardInfo } from "../middlewares/validatecardInfosMiddleware.js";

const employersRouter = Router();

employersRouter.patch("/employee/cards/:id", validateActivateCardInfo, activeCard);
employersRouter.get("/employee/cards/:id", getTransactions);
employersRouter.patch("/employee/cards/unblock/:id", unblockCard);

export default employersRouter;
