import { Schema, model, Document } from "mongoose";

// Cart Item (Embedded Document)
export interface ICartItem {
  product_id: Schema.Types.ObjectId;
  quantity: number;
}

// Cart
export interface ICart extends Document {
  user_id: string; // Better Auth user.id
  items: ICartItem[];
  created_at: Date;
  updated_at: Date;
}

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
  {
    _id: false,
  },
);

const cartSchema = new Schema<ICart>(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
