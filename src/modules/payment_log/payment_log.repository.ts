import PaymentLog, { IPaymentLog } from "../../models/payment_log"; // adjust path to your actual model location
import { Types } from "mongoose";

export const create = async (data: Partial<IPaymentLog>): Promise<IPaymentLog> => {
  return await PaymentLog.create(data);
};

export const findByOrderId = async (orderId: string): Promise<IPaymentLog | null> => {
  return await PaymentLog.findOne({ order_id: new Types.ObjectId(orderId) });
};

export const findByTransactionId = async (transactionId: string): Promise<IPaymentLog | null> => {
  return await PaymentLog.findOne({ transaction_id: transactionId });
};

export const updateStatus = async (
  transactionId: string,
  status: string,
  paidAt: Date | undefined
): Promise<IPaymentLog | null> => {
  return await PaymentLog.findOneAndUpdate(
    { transaction_id: transactionId },
    { status, paid_at: paidAt },
    { new: true }
  );
};