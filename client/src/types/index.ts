export type BoardCell = {
  position: number;
  player: string;
  symbol: string;
};

export type BoardType = BoardCell[];

export type InitialBoardCells = {
  position: number;
  player: string | null;
  symbol: string | null;
};

export type InitialBoard = InitialBoardCells[];

export type UpdatedBoardCells = {
  position: number;
  player: string | null;
  symbol: string | null;
};
export type UpdatedBoard = UpdatedBoardCells[];
