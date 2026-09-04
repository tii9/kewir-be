import { Schema, model, Document, Types } from "mongoose"; // add Types

export interface IPaymentLog extends Document {
  order_id: Types.ObjectId;  // was Schema.Types.ObjectId
  payment_type: string;
  transaction_id: string;
  amount: number;
  status: string;
  paid_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

const paymentLogSchema = new Schema<IPaymentLog>(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    payment_type: { type: String, required: true },
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true }, // e.g., 'settlement', 'pending', 'deny' dari Midtrans
    paid_at: { type: Date },
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const PaymentLog = model<IPaymentLog>("PaymentLog", paymentLogSchema);
export default PaymentLog;