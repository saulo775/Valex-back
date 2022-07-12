import { Router } from "express";

import cardsRouter from "./cardsRouter.js";
import employersRouter from "./employersRouter.js";
import rechargeRouter from "./rechargeRouter.js";
import purchaseRouter from "./purchaseRouter.js";

const routes = Router();

routes.use(cardsRouter);
routes.use(employersRouter);
routes.use(rechargeRouter);
routes.use(purchaseRouter);

export default routes;