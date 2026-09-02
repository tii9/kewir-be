import { Schema, model, Document, Types } from "mongoose"; // added Types

export interface IOrderItem {
  product_id: Types.ObjectId;   // was Schema.Types.ObjectId
  quantity: number;
  subtotal: number;
  total_amount: number;
}

export interface IOrder extends Document {
  user_id: Types.ObjectId;      // was Schema.Types.ObjectId
  order_number: string;
  items: IOrderItem[];
  total_items: number;
  subtotal: number;
  shipping_fee: number;
  total_amount: number;
  shipping_address: string;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    product_id: {
      type: Schema.Types.ObjectId,   // stays as-is, this is correct here
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    total_amount: { type: Number, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

const orderSchema = new Schema<IOrder>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, // stays as-is
    order_number: { type: String, required: true, unique: true },
    items: [orderItemSchema],
    total_items: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    shipping_fee: { type: Number, required: true, default: 0 },
    total_amount: { type: Number, required: true },
    shipping_address: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const Order = model<IOrder>("Order", orderSchema);
export default Order;