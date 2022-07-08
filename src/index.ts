import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());


const PORT = +process.env.PORT || 5500;
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}...`);
});