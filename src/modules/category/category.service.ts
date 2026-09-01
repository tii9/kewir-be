import {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
} from "./category.repository";
import { ICategory } from "../../models/category";

export const getAllCategories = async () => {
  return await findAll();
};

export const getCategoryById = async (id: string) => {
  const category = await findById(id);
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

export const createCategory = async (categoryData: Partial<ICategory>) => {
  return await create(categoryData);
};

export const updateCategory = async (
  id: string,
  categoryData: Partial<ICategory>
) => {
  const updatedCategory = await updateById(id, categoryData);
  if (!updatedCategory) {
    throw new Error("Category not found");
  }
  return updatedCategory;
};

export const deleteCategory = async (id: string) => {
  const deletedCategory = await deleteById(id);
  if (!deletedCategory) {
    throw new Error("Category not found");
  }
  return deletedCategory;
};
