import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  ownerId: Schema.Types.ObjectId;
  name: string;
  price: number;
  stock: number;
  status: "available" | "unavailable";
  imageDesc: string;
}

const productSchema = new Schema<IProduct>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A product must belong to an owner (renter)"],
    },
    name: {
      type: String,
      required: [true, "Product Name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    stock: {
      type: Number,
      required: [true, "stock is required"],
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    imageDesc: {
      type: String,
      required: [true, "Product Description is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Product = model<IProduct>("Product", productSchema);
export default Product;
