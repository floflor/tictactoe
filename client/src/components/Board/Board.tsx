/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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
  const { id } = useParams();

  const gameId = id;
  const [playerId, setPlayerId] = useState<string>();
  const [localId, setLocalId] = useState<string>();
  const [lastMove, setLastMove] = useState("");

  useEffect(() => {
    try {
      const positions = generateInitialBoard();

      socket.emit("get-board", gameId);
      socket.on("game-board", (newBoard: BoardType) => {
        if (!newBoard.length) {
          setBoard(positions);
        } else {
          setBoard(updateBoard(positions, newBoard));
        }
      });
      socket.on("move-made", (newBoard: BoardType) => {
        setLastMove(newBoard[newBoard.length - 1].symbol);
        setBoard(updateBoard(positions, newBoard));
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    socket.on("local-player-joined", (_, playerId) => {
      localStorage.setItem("localId", playerId);
      setLocalId(playerId);
    });
  }, [localId]);

  useEffect(() => {
    const player = localStorage.getItem("playerId");

    if (player) setPlayerId(JSON.parse(player));
  }, []);

  return (
    <>
      {playerId && (
        <BoardTable>
          {board.map((boards: UpdatedBoardCells) => (
            <BoardCell
              socket={socket}
              state={board}
              iKey={boards.position}
              key={boards.position}
              gameId={gameId}
              playerId={
                lastMove === "X" && localId ? localId  : playerId
              }
            >
              {boards.symbol === "X" && <XSymbol />}
              {boards.symbol === "O" && <OSymbol />}
            </BoardCell>
          ))}
        </BoardTable>
      )}
    </>
  );
};
export default Board;
