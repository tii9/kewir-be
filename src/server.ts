import "dotenv/config";
import express, { Request, Response } from "express";
import { connectDB } from "./lib/db";
import PaymentRouter from "./modules/payment/payment.route";
import ProductRouter from "./modules/products/product.route";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/product", ProductRouter);
app.use("/api/payment", PaymentRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hobiku API is running!");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
