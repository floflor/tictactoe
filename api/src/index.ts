import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import connectDB from "../config/database";
import gameHandlers from "./handlers/gameHandlers";
import * as admin from "firebase-admin";
import serviceAccount from "./../tictactoeauth-c1f2f-firebase-adminsdk-fmyfp-9e34675b12.json";
import authRoutes from "./authRoutes";
import bodyParser from "body-parser";

const serviceAccountCredentials = serviceAccount as admin.ServiceAccount;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountCredentials),
});

app.use("/auth", authRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const onConnection = (socket: Socket) => {
  gameHandlers(io, socket);
};

io.on("connection", onConnection);

httpServer.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening in port ${process.env.SERVER_PORT}`);
});
