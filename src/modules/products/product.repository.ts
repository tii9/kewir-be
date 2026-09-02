import Product, { IProduct } from "../../models/product";

export const findAll = async (): Promise<IProduct[]> => {
  return await Product.find().populate("category_id", "name");
};

export const findById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id).populate("category_id", "name");
};

export const create = async (
  productData: Partial<IProduct>,
): Promise<IProduct> => {
  return await Product.create(productData);
};

export const updateById = async (
  id: string,
  productData: Partial<IProduct>,
): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, productData, {
    returnDocument: "after",
    runValidators: true,
  });
};

export const deleteById = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(id);
};
