import { Router } from "express";

import cardsRouter from "./cardsRouter.js";
import employersRouter from "./employersRouter.js";

const routes = Router();

routes.use(cardsRouter);
routes.use(employersRouter);

export default routes;