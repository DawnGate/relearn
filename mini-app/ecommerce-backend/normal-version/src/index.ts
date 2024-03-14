import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { testController } from "./controller/testCtrl";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.json("Hello");
});

app.get("/test", testController);

app.listen(PORT, () => {
  console.log("start on port", PORT);
});
