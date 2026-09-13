import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Category = model<ICategory>("Category", categorySchema); // nama "Category" ini HARUS sama dengan ref: "Category" di product.model.ts
export default Category;