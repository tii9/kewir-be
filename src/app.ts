import express, { Application, Request, Response } from "express";
import cors from "cors";
import ProductRouter from "./modules/products/product.route";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", //origin frontend
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const GLOBAL_PREFIX = "api";
app.use("/api/product", ProductRouter);

app.get("/", (req: Request, res: Response) => {
  console.log("base route");
  res.send("The backend server is alive and running!");
});

export default app;
