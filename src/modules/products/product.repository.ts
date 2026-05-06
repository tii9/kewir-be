import Product, { IProduct } from "../../models/Product";

export const findAll = async (): Promise<IProduct[]> => {
  return await Product.find();
};
