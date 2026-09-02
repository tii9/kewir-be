import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  category_id: Schema.Types.ObjectId;
  owner_id: Schema.Types.ObjectId;
  name: string;
  price_per_day: number;
  desc: string;
  stock: number;
  is_available: boolean;
  fine: number;
  category?: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

const productSchema = new Schema<IProduct>(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category ID is required"],
    },
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner ID is required"],
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price_per_day: {
      type: Number,
      required: [true, "Price per day is required"],
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
    },
    is_available: {
      type: Boolean,
      default: true,
    },
    fine: {
      type: Number,
      required: [true, "Fine amount is required"],
    },
    category: {
      type: String,
    },
    image_url: {
      type: String,
      required: [true, "Image URL is required"],
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    // Mengubah default penamaan Mongoose (createdAt) menjadi snake_case (created_at) sesuai ERD
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

const Product = model<IProduct>("Product", productSchema);
export default Product;
