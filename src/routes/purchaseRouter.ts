import { Router } from "express";
import { newPurchase } from "../controllers/purchaseController.js";
import { checkPurchase } from "../middlewares/checkPurchaseMiddleware.js";

const purchaseRouter = Router();

purchaseRouter.post("/purchase/:cardId/:storeId/",checkPurchase, newPurchase);

export default purchaseRouter;