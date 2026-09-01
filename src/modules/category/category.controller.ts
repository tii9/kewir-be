import { Request, Response } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./category.service";

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await getAllCategories();

    res.status(200).json({
      message: "success",
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch categories",
    });
  }
};

export const getCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const category = await getCategoryById(id);

    res.status(200).json({
      message: "success",
      data: category,
    });
  } catch (error: any) {
    const statusCode = error.message === "Category not found" ? 404 : 500;
    res.status(statusCode).json({
      message: error.message || "Failed to fetch category",
    });
  }
};

export const createCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const category = await createCategory(req.body);

    res.status(201).json({
      message: "success",
      data: category,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to create category",
      error: error.errors || error,
    });
  }
};

export const updateCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const updatedCategory = await updateCategory(id, req.body);

    res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error: any) {
    const statusCode = error.message === "Category not found" ? 404 : 400;
    res.status(statusCode).json({
      message: error.message || "Failed to update category",
      error: error.errors || error,
    });
  }
};

export const deleteCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const deletedCategory = await deleteCategory(id);

    res.status(200).json({
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error: any) {
    const statusCode = error.message === "Category not found" ? 404 : 400;
    res.status(statusCode).json({
      message: error.message || "Failed to delete category",
      error: error.errors || error,
    });
  }
};
