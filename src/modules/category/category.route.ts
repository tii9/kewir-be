import express from "express";
import {
  getAllCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "./category.controller";

const CategoryRouter = express.Router();

CategoryRouter.get("/", getAllCategoriesController);
CategoryRouter.get("/:id", getCategoryByIdController);
CategoryRouter.post("/", createCategoryController);
CategoryRouter.put("/:id", updateCategoryController);
CategoryRouter.delete("/:id", deleteCategoryController);

export default CategoryRouter;
