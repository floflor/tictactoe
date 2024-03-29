import { WINNING_CONDITIONS } from "../constants";
import { Board } from "../types";
import bcrypt from "bcrypt";

export const checkPosition = (board: Board[], position: number) => {
  const isPositionFree = board.find((pos) => pos.position === position);
  return isPositionFree ? false : true;
};
//player can move ?
export const checkLastMove = (board: Board[], symbol?: string) => {
  const lastMove = board[board.length - 1];

  return lastMove && lastMove.symbol === symbol ? false : true;
};

export const isGameFinished = (board: Board[]) => {
  const positions = board.reduce((acc, move) => {
    const pos = move.position ? move.position : 0;
    acc[pos] = move.player;
    return acc;
  }, {} as { [key: number]: string | undefined });

  return (
    WINNING_CONDITIONS.some(
      ([a, b, c]) =>
        positions[a] &&
        positions[a] === positions[b] &&
        positions[a] === positions[c]
    ) || board.length === 9
  );
};

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const verifyToken = (token: string, email: string) => {
  if (token !== email) {
    throw new Error("Invalid token");
  }
  return;
};
