import { Router } from "express";

import { 
    activeCard, 
    getTransactions, 
    unblockCard, 
    blockCard 
} from "../controllers/employersCardsController.js";
// import { 
//     validateActivateCardInfo 
// } from "../middlewares/validatecardInfosMiddleware.js";
import { validateActivateCardInfo } from "../middlewares/validateCardInfosMiddleware.js"

const employersRouter = Router();

employersRouter.patch("/employee/cards/:id", validateActivateCardInfo, activeCard);
employersRouter.get("/employee/cards/:id", getTransactions);
employersRouter.patch("/employee/cards/unblock/:id", unblockCard);
employersRouter.patch("/employee/cards/block/:id", blockCard);

export default employersRouter;
