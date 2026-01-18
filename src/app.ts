import express, { Application } from "express";
import { Request, Response } from "express";
import cors from "cors";

import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { envVariables } from "./config";
const app: Application = express();

// parser

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Next.js admin URL
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(envVariables.PORT, () => {
  console.log(`Example app listening on port ${envVariables.PORT}`);
});
app.use(globalErrorHandler);

app.use(notFound);
export default app;
