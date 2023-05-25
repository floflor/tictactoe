import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String},
  password: { type: String },
  name: { type: String, required: true },
  symbol: { type: String },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
});

const User = mongoose.model("User", userSchema);

export default User;
