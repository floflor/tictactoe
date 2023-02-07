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
  const gameId = parseInt(id as string);
  const [playerId, setPlayerId] = useState<number>();
  const [error, setError] = useState("");
  const [localId, setLocalId] = useState<number>();
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
  }, [lastMove]);
  useEffect(() => {
    socket.on("local-player-joined", (_, playerId) => {
      localStorage.setItem("localId", playerId);
    });
  }, []);

  useEffect(() => {
    const player = localStorage.getItem("playerId");
    if (player) setPlayerId(JSON.parse(player));
    const playerLocal = localStorage.getItem("localId");
    if (playerLocal) setLocalId(JSON.parse(playerLocal));
  }, []);

  useEffect(() => {
    socket.on("error", (args) => {
      setError(args);
    });
  }, [error]);
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
                lastMove === "X" && localId ? (localId as number) : playerId
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
