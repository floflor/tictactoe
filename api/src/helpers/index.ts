import { WINNING_CONDITIONS } from "../constants";
import User from "../entities/UserEntity";
import { Board } from "../types";

export const checkPosition = (board: Board[], position: number) => {
  const isPositionFree = board.find((pos) => pos.position === position);
  return isPositionFree ? false : true;
};
//player can move ?
export const checkLastMove = (board: Board[], symbol: string) => {
  const lastMove = board[board.length - 1];

  return lastMove && lastMove.symbol === symbol ? false : true;
};

export const isGameFinished = (board: Board[]) => {
  const positions = board.reduce((acc, move) => {
    acc[move.position] = move.local ? "local" : move.player;
    return acc;
  }, {} as { [key: number]: number | string });

  return WINNING_CONDITIONS.some(
    ([a, b, c]) =>
      positions[a] &&
      positions[a] === positions[b] &&
      positions[a] === positions[c]
  ) || board.length === 9;
};

export const checkIfLocal = (board: Board[], player: number) => {
  const moves = board.length;
  const boardLocal = board.find((b) => b.local);
  if (moves === 1 && player === board[0].player) {
    return true;
  }
  if (boardLocal) return true;
  return false;
};
