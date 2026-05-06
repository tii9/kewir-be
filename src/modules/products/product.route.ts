import express from "express";
import { getAllProductsController } from "./product.controller";

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProductsController);

export default ProductRouter;
