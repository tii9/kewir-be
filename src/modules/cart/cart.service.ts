import { findByUserId, findByUserIdRaw, createCart, saveCart } from "./cart.repository";
import { Types } from "mongoose";

export const getCart = async (userId: string) => {
  let cart = await findByUserId(userId); // populated, for display
  if (!cart) {
    cart = await createCart(userId);
  }
  return cart;
};

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  let cart = await findByUserIdRaw(userId); // raw, for internal comparison

  if (!cart) {
    cart = await createCart(userId);
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product_id.toString() === productId
  );

  const existingItem = cart.items[itemIndex];

  if (itemIndex > -1 && existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product_id: new Types.ObjectId(productId) as any,
      quantity,
    });
  }

  return await saveCart(cart);
};

export const removeFromCart = async (userId: string, productId: string) => {
  const cart = await findByUserIdRaw(userId); // raw, for internal comparison
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(
    (item) => item.product_id.toString() !== productId // also fix: was ._id.toString()
  );

  return await saveCart(cart);
};