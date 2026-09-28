import mongoose, { Document, Types } from "mongoose";

export interface CartProduct {
  product: Types.ObjectId;
  quantity: number;
}

export interface CartType extends Document {
  user: Types.ObjectId;
  products: CartProduct[];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new mongoose.Schema<CartType>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Cart = mongoose.model<CartType>("Cart", cartSchema);
