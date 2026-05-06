import { findAll } from "./product.repository";

export const getAllProducts = async () => {
  return await findAll();
};
