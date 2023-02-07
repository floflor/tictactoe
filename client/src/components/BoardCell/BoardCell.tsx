import styled from "styled-components";
import { Socket } from "socket.io-client";
import { checkIfSamePlayer, checkIfjustOneMove } from "../../helpers";

const BoardCellContainer = styled.div((props) => ({
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const BoardCell = ({
  socket,
  state,
  gameId,
  playerId,
  iKey,
  children,
}: {
  socket: Socket;
  state: { position: number; player: number | null }[];
  gameId: number;
  playerId: number;
  iKey: number;
  children: any;
}) => {
  const handleClick = (e: any, key: number) => {
    e.preventDefault();
    if (checkIfjustOneMove(state) && checkIfSamePlayer(state, playerId)) {
      socket.emit("join-local", gameId);
      socket.emit("make-move", gameId, playerId, key);
    } else {
      socket.emit("make-move", gameId, playerId, key);
    }
  };

  return (
    <BoardCellContainer
      onClick={(e) => {
        handleClick(e, iKey);
      }}
    >
      {children}
    </BoardCellContainer>
  );
};

export default BoardCell;
