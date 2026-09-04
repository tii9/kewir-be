import { Request, Response } from "express";
import { checkout, getOrderById, getOrdersByUserId, changeOrderStatus } from "./order.service";

export const checkoutController = async (req: Request<{ userId: string }>, res: Response) => {
  try {
    const { userId } = req.params;
    const { shippingAddress, shippingFee } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    const order = await checkout(userId, shippingAddress, shippingFee || 0);
    res.status(201).json({ message: "Order created", data: order });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to checkout" });
  }
};

export const getOrderController = async (req: Request<{ orderId: string }>, res: Response) => {
  try {
    const order = await getOrderById(req.params.orderId);
    res.status(200).json({ message: "success", data: order });
  } catch (error: any) {
    res.status(404).json({ message: error.message || "Order not found" });
  }
};

export const getUserOrdersController = async (req: Request<{ userId: string }>, res: Response) => {
  try {
    const orders = await getOrdersByUserId(req.params.userId);
    res.status(200).json({ message: "success", data: orders });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch orders" });
  }
};

export const updateOrderStatusController = async (req: Request<{ orderId: string }>, res: Response) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    const order = await changeOrderStatus(req.params.orderId, status);
    res.status(200).json({ message: "Order status updated", data: order });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to update status" });
  }
};