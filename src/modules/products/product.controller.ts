import { Request, Response } from "express";
import { getAllProducts } from "./product.service";

export const getAllProductsController = async (req: Request, res: Response) => {
  const products = await getAllProducts();

  res.send({
    message: "success",
    data: products,
  });
};
