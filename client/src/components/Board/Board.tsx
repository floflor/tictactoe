import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { generateInitialBoard, updateBoard } from "../../helpers";
import OSymbol from "../../images/OSymbol";
import XSymbol from "../../images/XSymbol";
import { BoardType, UpdatedBoard, UpdatedBoardCells } from "../../types";
import BoardCell from "../BoardCell/BoardCell";
import { BoardTable } from "../styled-elements";

const Board = ({ socket }: { socket: Socket }) => {
  const [board, setBoard] = useState<UpdatedBoard>([]);
  const { id: gameId } = useParams();
  const [playerId, setPlayerId] = useState<string>();
  const [localId, setLocalId] = useState<string>();
  const [lastMove, setLastMove] = useState("");

  const initializeBoard = useCallback(() => {
    const positions = generateInitialBoard();
    socket.emit("get-board", gameId);
    socket.on("game-board", (newBoard: BoardType) => {
      if (!newBoard.length) {
        setBoard(positions);
      } else {
        setBoard(updateBoard(positions, newBoard));
      }
    });
  }, [gameId, socket]);

  const handleMoveMade = useCallback(() => {
    socket.on("move-made", (newBoard: BoardType) => {
      setLastMove(newBoard[newBoard.length - 1].symbol);
      setBoard((prevState) => updateBoard(prevState, newBoard));
    });
  }, [socket]);

  const handleLocalPlayerJoined = useCallback(() => {
    socket.on("local-player-joined", (_, playerId) => {
      localStorage.setItem("localId", playerId);
      setLocalId(playerId);
    });
  }, [socket]);

  useEffect(() => {
    try {
      initializeBoard();
      handleMoveMade();
    } catch (err) {
      console.log(err);
    }
  }, [initializeBoard, handleMoveMade]);

  useEffect(() => {
    handleLocalPlayerJoined();
  }, [handleLocalPlayerJoined]);

  useEffect(() => {
    const player = localStorage.getItem("playerId");
    if (player) setPlayerId(JSON.parse(player));
  }, []);

  return (
    <>
      {playerId && (
        <BoardTable>
          {board.map((cell: UpdatedBoardCells) => (
            <BoardCell
              socket={socket}
              state={board}
              iKey={cell.position}
              key={cell.position}
              gameId={gameId}
              playerId={lastMove === "X" && localId ? localId : playerId}
            >
              {cell.symbol === "X" && <XSymbol />}
              {cell.symbol === "O" && <OSymbol />}
            </BoardCell>
          ))}
        </BoardTable>
      )}
    </>
  );
};
export default Board;
