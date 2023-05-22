import { ObjectId } from "mongodb";
import mongoose, { Schema, Types } from "mongoose";
const gameSchema = new mongoose.Schema({

  board: {
    type: [
      {
        position: { type: Number },
        player: { type: String },
        symbol: { type: String },
      },
    ],
    required: true,
  },
  finished: { type: Boolean, required: true },
  players: { type: [mongoose.Schema.Types.ObjectId], required: true },
});

const Game = mongoose.model("Game", gameSchema);
export default Game;
