import { findByUserId, createCart, saveCart } from "./cart.repository";
import { Types } from "mongoose";

export const getCart = async (userId: string) => {
  let cart = await findByUserId(userId);
  if (!cart) {
    cart = await createCart(userId);
  }
  return cart;
};

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  let cart = await findByUserId(userId);
  
  if (!cart) {
    cart = await createCart(userId);
  }

  // Check if the product is already in the cart array
  const itemIndex = cart.items.findIndex(
    (item) => item.product_id._id.toString() === productId
  );

  if (itemIndex > -1) {
    // Product exists, update the quantity
    cart.items[itemIndex].quantity += quantity;
  } else {
    // Product is new to cart, push it
    cart.items.push({ 
      product_id: new Types.ObjectId(productId) as any, 
      quantity 
    });
  }

  return await saveCart(cart);
};

export const removeFromCart = async (userId: string, productId: string) => {
  const cart = await findByUserId(userId);
  if (!cart) throw new Error("Cart not found");

  // Filter out the item that needs to be removed
  cart.items = cart.items.filter(
    (item) => item.product_id._id.toString() !== productId
  );

  return await saveCart(cart);
};