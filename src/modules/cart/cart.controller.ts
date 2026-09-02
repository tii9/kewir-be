import { Request, Response } from "express";
import { getCart, addToCart, removeFromCart } from "./cart.service";
import { auth } from "../../lib/auth";

export const getCartController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const cart = await getCart(userId);

    res.status(200).json({ message: "success", data: cart });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch cart" });
  }
};

export const addToCartController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }

    const updatedCart = await addToCart(userId, productId, quantity);

    res.status(200).json({ message: "Item added to cart", data: updatedCart });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to add to cart" });
  }
};

export const removeFromCartController = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.params;
    const updatedCart = await removeFromCart(userId, productId);

    res
      .status(200)
      .json({ message: "Item removed from cart", data: updatedCart });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to remove item" });
  }
};
