export const updateBoard = (
  currentState: { position: number; player: number | null }[],
  updatedBoard: { position: number; player: number }[]
) => {
  const updatedState = currentState.map((position) => {
    const matchedBoard = updatedBoard.find(
      (item) => item.position === position.position
    );
    return matchedBoard || position;
  });

  return updatedState;
};

export const generateInitialBoard = () => {
  return Array.from({ length: 9 }, (_: any, i: number) => {
    return { position: i + 1, player: null };
  }) as { position: number; player: null | number }[];
};

export const checkIfjustOneMove = (board: any) => {
  let times = 0;
  board.map((item: any) => {
    if (item.player) {
      return (times += 1);
    }
    return null;
  });

  return times === 1 ? true : false;
};

export const checkIfSamePlayer = (board: any, playerId: number) => {
  const match = board.find((item: any) => item.player === playerId);
  return match ? true : false;
};
