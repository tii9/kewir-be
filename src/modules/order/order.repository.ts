import Order, { IOrder } from "../../models/order";
import { Types } from "mongoose";

export const create = async (orderData: Partial<IOrder>): Promise<IOrder> => {
  return await Order.create(orderData);
};

export const findById = async (id: string): Promise<IOrder | null> => {
  return await Order.findById(id).populate("items.product_id");
};

export const findByUserId = async (userId: string): Promise<IOrder[]> => {
  return await Order.find({ user_id: new Types.ObjectId(userId) }).sort({ created_at: -1 });
};

export const updateStatus = async (
  id: string,
  status: IOrder["status"]
): Promise<IOrder | null> => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};