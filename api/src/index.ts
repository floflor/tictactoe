import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import connectDB from "../config/database";
import gameHandlers from "./handlers/gameHandlers";

const app = express();

connectDB();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const onConnection = (socket: Socket) => {
  gameHandlers(io, socket);
};

io.on("connection", onConnection);

httpServer.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening in port ${process.env.SERVER_PORT}`);
});
