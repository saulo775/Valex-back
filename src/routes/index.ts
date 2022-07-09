import { Router } from "express";
import cardsRouter from "./cardsRouter.js";

const routes = Router();

routes.use(cardsRouter)

export default routes;