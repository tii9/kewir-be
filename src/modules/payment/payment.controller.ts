import { snap } from "../../lib/midtrans";
import { Request, Response } from "express";

export const createCheckout = async (req: Request, res: Response) => {
  try {
    const parameter = {
      transaction_details: {
        order_id: `ORDER-${Date.now()}`,
        gross_amount: 50000,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    res.status(200).json({
      token: transaction.token,
    });
  } catch (error) {
    console.error("Midtrans Error:", error);
    res.status(500).json({ error: "Failed to create transaction" });
  }
};
