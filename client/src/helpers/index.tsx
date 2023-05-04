import {
  BoardType,
  InitialBoard,
  UpdatedBoard,
  UpdatedBoardCells,
} from "../types";

export const updateBoard = (
  currentState: UpdatedBoard,
  updatedBoard: BoardType
) => {
  const updatedState = currentState.map((position) => {
    const matchedBoard = updatedBoard.find(
      (item) => item.position === position.position
    );
    return matchedBoard || position;
  });

  return updatedState;
};

export const generateInitialBoard = (): InitialBoard => {
  return Array.from({ length: 9 }, (_: any, i: number) => {
    return { position: i + 1, player: null, symbol: null };
  });
};

export const checkIfjustOneMove = (board: any) => {
  let times = 0;
  board.map((item: UpdatedBoardCells) => {
    if (item.player) {
      return (times += 1);
    }
    return null;
  });

  return times === 1 ? true : false;
};

export const checkIfSamePlayer = (board: any, playerId: string) => {
  const match = board.find((item: UpdatedBoardCells) => item.player === playerId);
  return match ? true : false;
};
