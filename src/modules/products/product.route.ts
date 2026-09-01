import express from "express";
import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "./product.controller";

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProductsController);
ProductRouter.get("/:id", getProductByIdController);
ProductRouter.post("/", createProductController);
ProductRouter.put("/:id", updateProductController);
ProductRouter.delete("/:id", deleteProductController);

export default ProductRouter;

