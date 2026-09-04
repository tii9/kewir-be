import crypto from "crypto";
import { snap } from "../../lib/midtrans";
import { create, findByOrderId, findByTransactionId, updateStatus } from "./payment_log.repository";
import { getOrderById, changeOrderStatus } from "../order/order.service";

export const createCheckout = async (orderId: string) => {
  const order = await getOrderById(orderId);

  const existing = await findByOrderId(orderId);
  if (existing && existing.status === "pending") {
    throw new Error("A pending payment already exists for this order");
  }

  const transactionId = `ORDER-${order._id}-${Date.now()}`; // unique per attempt, Midtrans requires this

  const parameter = {
    transaction_details: {
      order_id: transactionId,
      gross_amount: order.total_amount,
    },
  };

  const transaction = await snap.createTransaction(parameter);

  await create({
    order_id: order._id as any,
    payment_type: "midtrans_snap",
    transaction_id: transactionId,
    amount: order.total_amount,
    status: "pending",
  });

  return {
    token: transaction.token,
    redirect_url: transaction.redirect_url,
  };
};

const verifySignature = (
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean => {
  const serverKey = process.env.MIDTRANS_SERVER_KEY as string;
  const expected = crypto
    .createHash("sha512")
    .update(orderId + statusCode + grossAmount + serverKey)
    .digest("hex");
  return expected === signatureKey;
};

const midtransToOrderStatus = (transactionStatus: string): string | null => {
  switch (transactionStatus) {
    case "settlement":
    case "capture":
      return "paid";
    case "deny":
    case "cancel":
    case "expire":
    case "failure":
      return "cancelled";
    default:
      return null;
  }
};

export const handleNotification = async (payload: any) => {
  const {
    order_id: transactionId,
    status_code,
    gross_amount,
    signature_key,
    transaction_status,
  } = payload;

  if (!verifySignature(transactionId, status_code, gross_amount, signature_key)) {
    throw new Error("Invalid signature");
  }

  const paymentLog = await findByTransactionId(transactionId);
  if (!paymentLog) {
    throw new Error("Payment log not found for this transaction");
  }

  const paidAt =
    transaction_status === "settlement" || transaction_status === "capture"
      ? new Date()
      : undefined;

  const updated = await updateStatus(transactionId, transaction_status, paidAt);

  const newOrderStatus = midtransToOrderStatus(transaction_status);
  if (newOrderStatus) {
    await changeOrderStatus(paymentLog.order_id.toString(), newOrderStatus);
  }

  return updated;
};