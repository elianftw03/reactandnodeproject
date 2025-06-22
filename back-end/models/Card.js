import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [2, "Title must be at least 2 characters"],
    maxlength: [255, "Title must be less than 255 characters"],
  },
  description: {
    type: String,
    maxlength: [1024, "Description too long"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    match: [
      /^\d{9,}$/,
      "Phone must be at least 9 digits and contain only numbers",
    ],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  address: {
    type: String,
    maxlength: [400, "Address too long"],
  },
  imageUrl: {
    type: String,
    match: [
      /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)?$/,
      "Image must be a valid URL",
    ],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  favoritedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
