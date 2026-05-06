import express, { Application, Request, Response } from "express";
import cors from "cors";
import ProductRouter from "./modules/products/product.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:3000", //origin frontend
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api/product", ProductRouter);

app.get("/", (req: Request, res: Response) => {
  console.log("base route");
  res.send("The backend server is alive and running!");
});

export default app;
