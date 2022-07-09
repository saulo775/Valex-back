import { Router } from "express";
import { cardsController } from "../controllers/cardsController.js";
import { validateCardInfos } from "../middlewares/validatecardInfosMiddleware.js";
import { verifyKeyCompany } from "../middlewares/verifyKeyCompanyMiddleware.js";

const cardsRouter = Router();

cardsRouter.post("/cards",validateCardInfos, verifyKeyCompany, cardsController)

export default cardsRouter;