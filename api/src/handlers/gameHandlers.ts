import { Server, Socket } from "socket.io";
/* import Game from "../entities/GameEntity";
import User from "../entities/UserEntity"; */
import { Types } from "mongoose";
import Game from "../../models/Game";
import User from "../../models/User";
import { checkLastMove, checkPosition, isGameFinished } from "../helpers";

export default (io: Server, socket: Socket) => {
  const startGame = async (playerName: string) => {
    if (!playerName) {
      return socket.emit(
        "error",
        "You need to provide a user name before starting"
      );
    }

    const user = new User();
    user.symbol = "X";
    user.name = playerName;

    const savedUser = await user.save();
    const userId = savedUser._id;

    const game = new Game();
    game.players = [userId as unknown as string];
    game.board = [];
    game.finished = false;

    const savedGame = await game.save();
    const gameId = savedGame._id;

    user.game = gameId;
    await user.save();

    socket.join(gameId.toString());
    console.log(`Connected to rooms: ${gameId}`);
    socket.emit("game-started", gameId, userId);
  };

  const getBoard = async (gameId: Types.ObjectId) => {
    try {
      const game = await Game.findOne({ _id: gameId });

      if (!game) {
        return socket.emit("error", "Game not found");
      }

      if (game.finished) {
        return socket.emit("error", "The game is already finished");
      }

      socket.emit("game-board", game.board);
    } catch (error) {
      console.error(error);
      return socket.emit("error", "Failed to get game board");
    }
  };

  const joinLocalGame = async (gameId: Types.ObjectId) => {
    const game = await Game.findOne({ _id: gameId });

    if (!game) {
      return socket.emit("error", "Game not found");
    }

    if (game.players.length === 2) {
      return socket.emit("error", "The game is already full");
    }

    const user = new User();

    user.name = "local";
    user.game = gameId;
    user.symbol = "O";
    const savedUser = await user.save();
    const userId = savedUser._id;

    game.players.push(userId as unknown as string);

    await game.save();
    socket.join(gameId.toString());
    io.to(gameId.toString()).emit("local-player-joined", gameId, user._id);
  };

  const makeMove = async (
    gameId: Types.ObjectId,
    player: Types.ObjectId,
    position: number
  ) => {
    const game = await Game.findOne({ _id: gameId });
    const user = await User.findOne({ _id: player });
    if (!game) {
      return socket.emit("error", "Game not found");
    }
    if (!user) {
      return socket.emit("error", "User not found");
    }

    if (game.finished) {
      return socket.emit("error", "The game is already finished");
    }

    if (!checkPosition(game.board, position)) {
      return socket.emit("error", "The position is already taken");
    }

    if (!checkLastMove(game.board, user.symbol)) {
      return socket.emit("error", "Wait for your partner to complete the turn");
    }
    if (game.board.length === 9) {
      game.finished = true;
      await game.save();
      return io.to(gameId.toString()).emit("game-finished", player);
    }

    game.board.push({
      position,
      player: player as unknown as string,
      symbol: user.symbol,
    });
    await game.save();

    io.to(gameId.toString()).emit("move-made", game.board);

    const gameFinished = isGameFinished(game.board);

    if (gameFinished) {
      let winner;
      if (game.board.length !== 9) {
        winner = user.name;
      }
      game.finished = true;
      await game.save();
      return io
        .to(gameId.toString())
        .emit("game-finished", winner || "No more moves");
    }
  };

  /* 

  const joinGame = async (gameId: number, playerName: string) => {
    if (!gameId) {
      return socket.emit(
        "error",
        "You need to provide a game ID before starting"
      );
    }
    if (!playerName) {
      return socket.emit(
        "error",
        "You need to provide a user name before starting"
      );
    }
    const game = await Game.findOne({ where: { id: gameId } });
    if (!game) {
      return socket.emit("error", "Game not found");
    }

    if (game.players.length === 2) {
      return socket.emit("error", "The game is already full");
    }

    if (!game.board.length) {
      return socket.emit(
        "error",
        "The game isn't started yet, wait for your partner to start it."
      );
    }

    const user = new User();
    user.name = playerName;
    user.game = gameId;
    user.symbol = "O";
    await user.save();

    game.players.push(user.id);

    await Game.save(game);
    socket.join(gameId.toString());
    io.to(gameId.toString()).emit("player-joined", gameId, user.id);
  };

  const makeMove = async (gameId: number, player: number, position: number) => {
    const game = await Game.findOne({ where: { id: gameId } });
    const user = await User.findOne({ where: { id: player } });
    if (!game) {
      return socket.emit("error", "Game not found");
    }
    if (!user) {
      return socket.emit("error", "User not found");
    }

    if (game.finished) {
      return socket.emit("error", "The game is already finished");
    }

    if (!checkPosition(game.board, position)) {
      return socket.emit("error", "The position is already taken");
    }

    if (!checkLastMove(game.board, user.symbol)) {
      return socket.emit("error", "Wait for your partner to complete the turn");
    }
    if (game.board.length === 9) {
      game.finished = true;
      await Game.save(game);
      return io.to(gameId.toString()).emit("game-finished", player);
    }

    game.board.push({ position, player, symbol: user.symbol });
    await Game.save(game);

    io.to(gameId.toString()).emit("move-made", game.board);

    const gameFinished = isGameFinished(game.board);

    if (gameFinished) {
      let winner;
      if (game.board.length !== 9) {
        winner = user.name;
      }
      game.finished = true;
      await Game.save(game);
      return io
        .to(gameId.toString())
        .emit("game-finished", winner || "No more moves");
    }
  };


  const getGameStatus = async (gameId: number) => {
    const game = await Game.findOne({ where: { id: gameId } });
    if (!game) {
      return socket.emit("error", "Game not found");
    }
    socket.emit("game-info", game.finished);
  };
 */
  socket.on("start-game", startGame);
  socket.on("get-board", getBoard);
  socket.on("join-local", joinLocalGame);
  /*  socket.on("join-game", joinGame);
  socket.on("make-move", makeMove);

  socket.on("game-status", getGameStatus); */
};
