import { findAll, findById, create, updateById, deleteById } from "./product.repository";
import { IProduct } from "../../models/Product";

export const getAllProducts = async () => {
  return await findAll();
};

export const getProductById = async (id: string) => {
  const product = await findById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const createProduct = async (productData: Partial<IProduct>) => {
  return await create(productData);
};

export const updateProduct = async (
  id: string,
  productData: Partial<IProduct>
) => {
  const updatedProduct = await updateById(id, productData);
  if (!updatedProduct) {
    throw new Error("Product not found");
  }
  return updatedProduct;
};

export const deleteProduct = async (id: string) => {
  const deletedProduct = await deleteById(id);
  if (!deletedProduct) {
    throw new Error("Product not found");
  }
  return deletedProduct;
};

