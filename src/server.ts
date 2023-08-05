import express, { NextFunction, Request, Response } from "express";

import { router } from "./routes";

import "express-async-errors";

const app = express();
app.use(express.json());
app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {});

app.listen(3333, () => {
	console.log("Servidor online!");
});
