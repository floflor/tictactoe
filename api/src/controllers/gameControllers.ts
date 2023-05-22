// gameController.ts
import mongoose, { Types } from "mongoose";
import Game from "../../models/Game";
import User from "../../models/User";
import { checkLastMove, checkPosition, isGameFinished } from "../helpers";
import handleTransactions from "../middlewares/transaction";

const validateJoinGameInput = (gameId: Types.ObjectId) => {
  if (!gameId) {
    throw new Error("You need to provide a game ID before starting");
  }
};

const validateMoveInput = (
  gameId: Types.ObjectId,
  player: Types.ObjectId,
  position: number
) => {
  if (!gameId || !player) {
    throw new Error("Game ID and player ID are required");
  }
  if (position === undefined || position === null) {
    throw new Error("Position is required");
  }
};

export const startGame = async (email: string) => {
  return handleTransactions(async (session) => {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found.");
    }

    const game = new Game();
    game.players = [user._id];
    game.board = [];
    game.finished = false;

    const savedGame = await game.save({ session });
    const newGameId = savedGame._id;
    user.symbol = "X";
    user.games.push(game._id);
    await user.save({ session });

    await session.commitTransaction();

    return { gameId: newGameId, userId: user._id };
  });
};

export const getBoard = async (gameId: Types.ObjectId) => {
  const game = await Game.findOne({ _id: gameId });

  if (!game) {
    throw new Error("Game not found");
  }

  if (game.finished) {
    throw new Error("The game is already finished");
  }

  return game.board;
};

export const joinLocalGame = async (gameId: Types.ObjectId) => {
  return handleTransactions(async (session) => {
    const game = await Game.findOne({ _id: gameId });

    if (!game) {
      throw new Error("Game not found");
    }

    if (game.players.length === 2) {
      throw new Error("The game is already full");
    }

    const user = new User();

    user.name = "local";
    user.symbol = "O";
    user.games.push(game._id);
    const savedUser = await user.save();
    const userId = savedUser._id;
    game.players.push(userId);

    await game.save();

    return { gameId, userId };
  });
};

export const makeMove = async (
  gameId: Types.ObjectId,
  player: Types.ObjectId,
  position: number
) => {
  return handleTransactions(async (session) => {
    validateMoveInput(gameId, player, position);

    const game = await Game.findOne({ _id: gameId });
    const user = await User.findOne({ _id: player });

    if (!game) {
      throw new Error("Game not found");
    }

    if (!user) {
      throw new Error("User not found");
    }

    if (game.finished) {
      throw new Error("The game is already finished");
    }

    if (!checkPosition(game.board, position)) {
      throw new Error("The position is already taken");
    }
    if (!checkLastMove(game.board, user.symbol)) {
      throw new Error("Wait for your partner to complete the turn");
    }

    if (game.board.length === 9) {
      game.finished = true;
      await game.save();
      return { updatedBoard: game.board, gameFinished: true };
    }

    game.board.push({
      position,
      player: player as unknown as string,
      symbol: user.symbol,
    });
    await game.save();

    const gameFinished = isGameFinished(game.board);
    let winner;

    if (gameFinished) {
      if (game.board.length !== 9) {
        winner = user.name;
      }
      game.finished = true;
      await game.save();
    }

    return { updatedBoard: game.board, gameFinished, winner };
  });
};

export const joinGame = async (gameId: Types.ObjectId, email: string) => {
  return handleTransactions(async (session) => {
    validateJoinGameInput(gameId);

    const game = await Game.findOne({ _id: gameId });

    if (!game) {
      throw new Error("Game not found");
    }

    if (game.players.length === 2) {
      throw new Error("The game is already full");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }

    user.games.push(game._id);
    user.symbol = "O";
    const savedUser = await user.save();
    const userId = savedUser._id;

    game.players.push(userId);

    await game.save();

    return userId;
  });
};

export const getGameStatus = async (gameId: Types.ObjectId) => {
  if (!gameId) {
    throw new Error("Game ID is required");
  }

  const game = await Game.findOne({ _id: gameId });

  if (!game) {
    throw new Error("Game not found");
  }

  return game.finished;
};
