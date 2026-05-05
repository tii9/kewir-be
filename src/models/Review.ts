import { Schema, model, Document } from 'mongoose';

export interface ICheckout extends Document {
  userId: Schema.Types.ObjectId;     
  produkId: Schema.Types.ObjectId;    
  amount: number;                    
  totalPrice: number;                
  paymentMethod: string;             // checkout API 
  status: 'pending' | 'cancelled' | 'success'; 
  createdAt: Date;
  updatedAt: Date;
}

const checkoutSchema = new Schema<ICheckout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Checkout must belong to a user']
    },
    produkId: {
      type: Schema.Types.ObjectId,
      ref: 'Produk',
      required: [true, 'Checkout must link to a product']
    },
    amount: {
      type: Number,
      required: [true, 'Amount/quantity is required'],
      min: [1, 'Amount must be at least 1']
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price cannot be negative']
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
      default: 'pending_selection' // Placeholder
    },
    status: {
      type: String,
      enum: ['pending', 'rented', 'returned'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

const Checkout = model<ICheckout>('Checkout', checkoutSchema);
export default Checkout;