import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
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
ProductRouter.post("/", authMiddleware, createProductController);
ProductRouter.put("/:id", authMiddleware, updateProductController);
ProductRouter.delete("/:id", authMiddleware, deleteProductController);

export default ProductRouter;
