import { Router } from "express";
import {rechargeCard} from  "../controllers/rechargeCardController.js"
import { checkAmount } from "../middlewares/checkAmountMiddleware copy.js";
import { verifyKeyCompany } from "../middlewares/verifyKeyCompanyMiddleware.js";

const rechargeRouter =  Router();

rechargeRouter.patch("/recharge/card/:id",verifyKeyCompany, checkAmount, rechargeCard);

export default rechargeRouter;