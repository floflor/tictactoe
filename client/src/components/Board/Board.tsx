/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useEffect, useState } from "react";
import BoardCell from "../BoardCell/BoardCell";
import { generateInitialBoard, updateBoard } from "../../helpers";
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import OSymbol from "../../images/OSymbol";
import XSymbol from "../../images/XSymbol";

const BoardTable = styled.div((props) => ({
  width: "60%",
  height: "60%",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
  columnGap: "5px",
  rowGap: "5px",
}));

const Board = ({ socket }: { socket: Socket }) => {
  const [board, setBoard] = useState<any>([]);
  const { id } = useParams();
  const gameId = parseInt(id as string);
  const [playerId, setPlayerId] = useState<number>();
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const positions = generateInitialBoard();
      socket.emit("get-board", gameId);
      socket.on("game-board", (newBoard) => {
        if (!newBoard.length) {
          setBoard(positions);
        } else {
          setBoard(updateBoard(positions, newBoard));
        }
      });
      socket.on("move-made", (newBoard) => {
        setBoard(updateBoard(positions, newBoard));
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    socket.on("local-player-joined", (_, playerId) => {
      localStorage.setItem("localId", playerId);
    });
  }, []);

  useEffect(() => {
    const player = localStorage.getItem("playerId");
    if (player) setPlayerId(JSON.parse(player));
  }, []);

  useEffect(() => {
    socket.on("error", (args) => {
      console.log(args);
      setError(args);
    });
  }, [error]);
  return (
    <>
      {playerId && (
        <BoardTable>
          {board.map((boards: any) => (
            <BoardCell
              socket={socket}
              state={board}
              iKey={boards.position}
              key={boards.position}
              gameId={gameId}
              playerId={playerId}
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
