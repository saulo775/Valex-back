import { Router } from "express";
import { activeCard } from "../controllers/employersCardsController.js";
import { validateActivateCardInfo } from "../middlewares/validatecardInfosMiddleware.js";

const employersRouter = Router();

employersRouter.patch("/employer/cards/:id", validateActivateCardInfo, activeCard);

export default employersRouter;
