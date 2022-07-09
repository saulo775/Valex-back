import express, { json, NextFunction, Request,  Response } from "express";
import "express-async-errors";
import cors from "cors";

import routes from "./routes/index.js";
import { AppError } from "./errors/AppError.js";

const app = express();
app.use(json());
app.use(cors());
app.use(routes);
app.use(
    (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                message: err.message
            });
        }
        return res.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
        })
    }
)

const PORT = +process.env.PORT || 5500;
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}...`);
});