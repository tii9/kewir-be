import { Request, Response } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.service";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      message: "success",
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch products",
    });
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await getProductById(id);

    res.status(200).json({
      message: "success",
      data: product,
    });
  } catch (error: any) {
    const statusCode = error.message === "Product not found" ? 404 : 500;
    res.status(statusCode).json({
      message: error.message || "Failed to fetch product",
    });
  }
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      message: "success",
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to create product",
      error: error.errors || error,
    });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const updatedProduct = await updateProduct(id, req.body);

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error: any) {
    const statusCode = error.message === "Product not found" ? 404 : 400;
    res.status(statusCode).json({
      message: error.message || "Failed to update product",
      error: error.errors || error,
    });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deletedProduct = await deleteProduct(id);

    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error: any) {
    const statusCode = error.message === "Product not found" ? 404 : 400;
    res.status(statusCode).json({
      message: error.message || "Failed to delete product",
      error: error.errors || error,
    });
  }
};
