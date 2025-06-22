import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String },
    lastName: { type: String },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: { type: String },
    imageAlt: { type: String },
    state: { type: String },
    country: { type: String },
    city: { type: String },
    street: { type: String },
    houseNumber: { type: String },
    zip: { type: String },
    isBusiness: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
