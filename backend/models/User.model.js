import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  postalCode: String,
  country: { type: String, default: "India" },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minLength: 3,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 3,
    },

    username: {
      type: String,
      maxLength: 16,
      minLength: 4,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minlength: 6,
    },

    // // GOOGLE LOGIN
    googleId: {
      type: String,
      default: null,
    },

    avatar: {
      type: String,
      default:null
    },

    avatarPublicId:{
          type: String,
      default:null
    },

    role: {
      type: String,
      enum: ["user", "seller", "admin", "super_admin"],
      default: "user",
    },

    // ADDRESS BOOK
    addresses: [addressSchema],

    // // CART ITEMS
    // cart: [
    //   {
    //     productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    //     quantity: { type: Number, default: 1 },
    //     price: Number, // price at time of adding
    //   },
    // ],

    // // WISHLIST
    // wishlist: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product",
    //   },
    // ],

    // // ORDER HISTORY (ref only)
    // orders: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Order",
    //   },
    // ],

    otp: { type: String },
    otpExpiry: { type: Date },

    // REFRESH TOKEN STORAGE
    token: {
      type: String,
      default: null,
    },

    // // SUBSCRIPTION PLAN
    // subscription: {
    //   plan: {
    //     type: String,
    //     enum: ["none", "basic", "pro", "enterprise"],
    //     default: "none",
    //   },
    //   expiresAt: { type: Date },
    // },

    // // NOTIFICATION SETTINGS
    // notificationSettings: {
    //   newOrder: { type: Boolean, default: true },
    //   ticketUpdates: { type: Boolean, default: true },
    //   marketingEmails: { type: Boolean, default: false },
    // },

    // ACCOUNT SECURITY
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    lastLogin: { type: Date },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
