import dotenv from "dotenv";
dotenv.config();

import { Server, Socket } from "socket.io";
import { Types } from "mongoose";
import {
  startGame,
  getBoard,
  joinLocalGame,
  makeMove,
  joinGame,
  getGameStatus,
} from "../controllers/gameControllers";
import handleEvent from "../middlewares/errorHandling";

export default (io: Server, socket: Socket) => {
  socket.on(
    "start-game",
    handleEvent(socket, async (email: string) => {
      const { gameId, userId } = await startGame(email);
      socket.join(gameId.toString());
      console.log(`Connected to rooms: ${gameId}`);
      socket.emit("game-started", gameId, userId);
    })
  );

  socket.on(
    "get-board",
    handleEvent(socket, async (gameId: Types.ObjectId) => {
      const board = await getBoard(gameId);
      socket.emit("game-board", board);
    })
  );

  socket.on(
    "join-local",
    handleEvent(socket, async (inputGameId: Types.ObjectId) => {
      const { gameId, userId } = await joinLocalGame(inputGameId);
      socket.join(gameId.toString());
      io.to(gameId.toString()).emit("local-player-joined", gameId, userId);
    })
  );

  socket.on(
    "make-move",
    handleEvent(
      socket,
      async (
        gameId: Types.ObjectId,
        player: Types.ObjectId,
        position: number
      ) => {
        const { updatedBoard, gameFinished, winner } = await makeMove(
          gameId,
          player,
          position
        );
        io.to(gameId.toString()).emit("move-made", updatedBoard);

        if (gameFinished) {
          io.to(gameId.toString()).emit(
            "game-finished",
            winner || "No more moves"
          );
        }
      }
    )
  );

  socket.on(
    "join-game",
    handleEvent(socket, async (gameId: Types.ObjectId, email: string) => {
      const userId = await joinGame(gameId, email);
      socket.join(gameId.toString());
      io.to(gameId.toString()).emit("player-joined", gameId, userId);
    })
  );

  socket.on(
    "game-status",
    handleEvent(socket, async (gameId: Types.ObjectId) => {
      const gameFinished = await getGameStatus(gameId);
      socket.emit("game-info", gameFinished);
    })
  );
};
