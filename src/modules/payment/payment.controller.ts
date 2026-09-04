import { Request, Response } from "express";
import { createCheckout, handleNotification } from "./payment.service";

export const createCheckoutController = async (
  req: Request<{ orderId: string }>,
  res: Response
) => {
  try {
    const { orderId } = req.params;
    const result = await createCheckout(orderId);
    res.status(200).json({ message: "Transaction created", data: result });
  } catch (error: any) {
    console.error("Midtrans Error:", error);
    res.status(400).json({ message: error.message || "Failed to create transaction" });
  }
};

export const notificationController = async (req: Request, res: Response) => {
  try {
    await handleNotification(req.body);
    res.status(200).json({ message: "Notification handled" });
  } catch (error: any) {
    console.error("Midtrans notification error:", error.message);
    res.status(200).json({ message: "Received" }); // 200 even on error, or Midtrans retries aggressively
  }
};