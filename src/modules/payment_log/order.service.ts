import { Types } from "mongoose";
import { findByUserIdRaw, clearCart } from "../cart/cart.repository";
import { findById as findProductById, decrementStock } from "../products/product.repository";
import {
  create as createOrder,
  findById as findOrderById,
  findByUserId as findOrdersByUserId,
  updateStatus,
} from "./payment_log.repository";
import { IOrderItem } from "../../models/order";

const generateOrderNumber = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `ORD-${timestamp}-${random}`;
};

export const checkout = async (
  userId: string,
  shippingAddress: string,
  shippingFee: number = 0
) => {
  const cart = await findByUserIdRaw(userId);

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const orderItems: Partial<IOrderItem>[] = [];
  let subtotal = 0;

  // Validate stock and build order items first, before mutating anything
  for (const item of cart.items) {
    const product = await findProductById(item.product_id.toString());

    if (!product) {
      throw new Error(`Product ${item.product_id} not found`);
    }
    if (!product.is_available || product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product.name}`);
    }

    const itemSubtotal = product.price_per_day * item.quantity;

    orderItems.push({
      product_id: item.product_id,
      quantity: item.quantity,
      subtotal: itemSubtotal,
      total_amount: itemSubtotal,
    });

    subtotal += itemSubtotal;
  }

  // Decrement stock for every item
  for (const item of cart.items) {
    const updated = await decrementStock(item.product_id.toString(), item.quantity);
    if (!updated) {
      throw new Error(`Stock changed for product ${item.product_id}, please retry checkout`);
    }
  }

  const totalAmount = subtotal + shippingFee;

  const order = await createOrder({
    user_id: new Types.ObjectId(userId) as any,
    order_number: generateOrderNumber(),
    items: orderItems as IOrderItem[],
    total_items: cart.items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal,
    shipping_fee: shippingFee,
    total_amount: totalAmount,
    shipping_address: shippingAddress,
    status: "pending",
  });

  await clearCart(userId);

  return order;
};

export const getOrderById = async (orderId: string) => {
  const order = await findOrderById(orderId);
  if (!order) throw new Error("Order not found");
  return order;
};

export const getOrdersByUserId = async (userId: string) => {
  return await findOrdersByUserId(userId);
};

export const changeOrderStatus = async (orderId: string, status: string) => {
  const order = await updateStatus(orderId, status as any);
  if (!order) throw new Error("Order not found");
  return order;
};