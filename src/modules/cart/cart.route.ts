import express from "express";
import {
  getCartController,
  addToCartController,
  removeFromCartController,
} from "./cart.controller";

const CartRouter = express.Router();

// Get the user's cart
CartRouter.get("/:userId", getCartController);

// Add an item to the cart
CartRouter.post("/:userId/add", addToCartController);

// Remove a specific item from the cart
CartRouter.delete("/:userId/remove/:productId", removeFromCartController);

export default CartRouter;