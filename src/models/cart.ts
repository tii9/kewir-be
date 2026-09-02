import { Schema, model, Document, Types } from "mongoose";

// Interface untuk Cart Item (Embedded)
export interface ICartItem {
  product_id: Types.ObjectId;
  quantity: number;
}

// Interface untuk Cart utama
export interface ICart extends Document {
  user_id: Types.ObjectId;
  items: ICartItem[]; // cart_item masuk ke sini
  created_at: Date;
  updated_at: Date;
}

// Schema untuk item (tidak dijadikan model terpisah)
const cartItemSchema = new Schema<ICartItem>(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
  },
  // Sub-document juga bisa punya timestamp kalau dibutuhkan sesuai diagram
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const cartSchema = new Schema<ICart>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const Cart = model<ICart>("Cart", cartSchema);
export default Cart;