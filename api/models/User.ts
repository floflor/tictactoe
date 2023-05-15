import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
  tokenExpiration: { type: Date },
  name: { type: String, required: true },
  symbol: { type: String },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
});

const User = mongoose.model("User", userSchema);

export default User;
