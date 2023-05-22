import { Types } from "mongoose";

export type Board = {
  position?: number;
  player?: string;
  symbol?: string;
};

export interface StartGameResponse {
  gameId: Types.ObjectId;
  userId: Types.ObjectId;
}
