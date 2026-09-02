import Cart, { ICart, ICartItem } from "../../models/cart";
import { Types } from "mongoose"; // 1. Import Types from mongoose

export const findByUserId = async (userId: string): Promise<ICart | null> => {
  // 2. Convert the string to an ObjectId
  return await Cart.findOne({ user_id: new Types.ObjectId(userId) }).populate("items.product_id");
};

export const createCart = async (userId: string): Promise<ICart> => {
  // 3. Convert the string to an ObjectId here as well
  return await Cart.create({ user_id: new Types.ObjectId(userId), items: [] });
};

export const saveCart = async (cart: ICart): Promise<ICart> => {
  return await cart.save();
};