export type BoardCell = {
  position: number;
  player: number;
  symbol: string;
};

export type BoardType = BoardCell[];

export type InitialBoardCells = {
  position: number;
  player: number | null;
  symbol: string | null;
};

export type InitialBoard = InitialBoardCells[];

export type UpdatedBoardCells = {
  position: number;
  player: number | null;
  symbol: string | null;
};
export type UpdatedBoard = UpdatedBoardCells[];
