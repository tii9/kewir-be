import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  dob: Date;
  password: string;
  address: string;
  role: 'renter' | 'customer' | 'admin';
  isVerified: boolean;
  createdAt: Date;
}


const userSchema = new Schema<IUser>(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'],
      trim: true 
    },
    dob: { 
      type: Date, 
      required: [true, 'Date of Birth is required'] 
    },
    password: { 
      type: String, 
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    address: { 
      type: String, 
      required: [true, 'Address is required'] 
    },
    role: { 
      type: String, 
      enum: ['renter', 'customer', 'admin'], 
      default: 'customer' 
    },
    isVerified: { 
      type: Boolean, 
      default: false 
    }
  },
  {
   
    timestamps: true 
  }
);


const User = model<IUser>('User', userSchema);
export default User;