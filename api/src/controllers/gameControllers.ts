// gameController.ts
import { Types } from "mongoose";
import Game from "../../models/Game";
import User from "../../models/User";
import { checkLastMove, checkPosition, isGameFinished } from "../helpers";

const validateStartGameInput = (playerName: string) => {
  if (!playerName) {
    throw new Error("You need to provide a user name before starting");
  }
};

const validateJoinGameInput = (gameId: Types.ObjectId, playerName: string) => {
  if (!gameId) {
    throw new Error("You need to provide a game ID before starting");
  }
  if (!playerName) {
    throw new Error("You need to provide a user name before starting");
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

export const startGame = async (playerName: string) => {
  validateStartGameInput(playerName);

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

  return { gameId, userId };
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
  const game = await Game.findOne({ _id: gameId });

  if (!game) {
    throw new Error("Game not found");
  }

  if (game.players.length === 2) {
    throw new Error("The game is already full");
  }

  const user = new User();

  user.name = "local";
  user.game = gameId;
  user.symbol = "O";
  const savedUser = await user.save();
  const userId = savedUser._id;

  game.players.push(userId as unknown as string);

  await game.save();

  return { gameId, userId };
};

export const makeMove = async (
  gameId: Types.ObjectId,
  player: Types.ObjectId,
  position: number
) => {
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
};

export const joinGame = async (gameId: Types.ObjectId, playerName: string) => {
  validateJoinGameInput(gameId, playerName);

  const game = await Game.findOne({ _id: gameId });

  if (!game) {
    throw new Error("Game not found");
  }

  if (game.players.length === 2) {
    throw new Error("The game is already full");
  }

  const user = new User();

  user.name = playerName;
  user.game = gameId;
  user.symbol = "O";
  const savedUser = await user.save();
  const userId = savedUser._id;

  game.players.push(userId as unknown as string);

  await game.save();

  return userId;
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
