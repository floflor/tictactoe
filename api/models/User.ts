import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({

  name: { type: String, required: true },
  symbol: { type: String },
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
});

const User = mongoose.model("User", userSchema);

export default User;
