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

export default (io: Server, socket: Socket) => {
  socket.on(
    "start-game",
    async (email: string) => {
      try {
        const { gameId, userId } = await startGame(email);
        
        socket.join(gameId.toString());
        console.log(`Connected to rooms: ${gameId}`);
        socket.emit("game-started", gameId, userId);
      } catch (error) {
        handleError(socket, error);
      }
    }
  );

  socket.on("get-board", async (gameId: Types.ObjectId) => {
    try {
      const board = await getBoard(gameId);
      socket.emit("game-board", board);
    } catch (error) {
      handleError(socket, error);
    }
  });

  socket.on("join-local", async (inputGameId: Types.ObjectId) => {
    try {
      const { gameId, userId } = await joinLocalGame(inputGameId);
      socket.join(gameId.toString());
      io.to(gameId.toString()).emit("local-player-joined", gameId, userId);
    } catch (error) {
      handleError(socket, error);
    }
  });

  socket.on(
    "make-move",
    async (
      gameId: Types.ObjectId,
      player: Types.ObjectId,
      position: number
    ) => {
      try {
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
      } catch (error) {
        handleError(socket, error);
      }
    }
  );

  socket.on("join-game", async (gameId: Types.ObjectId, email: string) => {
    try {
      const userId = await joinGame(gameId, email);
      socket.join(gameId.toString());
      io.to(gameId.toString()).emit("player-joined", gameId, userId);
    } catch (error) {
      handleError(socket, error);
    }
  });

  socket.on("game-status", async (gameId: Types.ObjectId) => {
    try {
      const gameFinished = await getGameStatus(gameId);
      socket.emit("game-info", gameFinished);
    } catch (error) {
      handleError(socket, error);
    }
  });

  const handleError = (socket: Socket, error: any) => {
    console.error(error);
    socket.emit("error", error.message);
  };
};
