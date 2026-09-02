import Category, { ICategory } from "../../models/category";

export const findAll = async (): Promise<ICategory[]> => {
  return await Category.find();
};

export const findById = async (id: string): Promise<ICategory | null> => {
  return await Category.findById(id);
};

export const create = async (categoryData: Partial<ICategory>): Promise<ICategory> => {
  return await Category.create(categoryData);
};

export const updateById = async (
  id: string,
  categoryData: Partial<ICategory>
): Promise<ICategory | null> => {
  return await Category.findByIdAndUpdate(id, categoryData, {
    returnDocument: "after",
    runValidators: true,
  });
};

export const deleteById = async (id: string): Promise<ICategory | null> => {
  return await Category.findByIdAndDelete(id);
};
