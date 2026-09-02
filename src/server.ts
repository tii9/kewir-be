import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import { connectDB } from "./lib/db";
import PaymentRouter from "./modules/payment/payment.route";
import ProductRouter from "./modules/products/product.route";
import CategoryRouter from "./modules/category/category.route";
import CartRouter from "./modules/cart/cart.route";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import process from "process";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/product", ProductRouter);
app.use("/api/payment", PaymentRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/cart", CartRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hobiku API is running!");
});

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
