import Board from "../../components/Board/Board";
import { Socket } from "socket.io-client";
import {
  BoardContainer,
  GridLayer,
  LogsContainer,
} from "../../components/styled-elements";
import Logs from "../../components/Logs/Logs";

const Game = ({ socket }: { socket: Socket }) => {
  return (
    <GridLayer>
      <BoardContainer>
        <Board socket={socket} />
      </BoardContainer>
      <LogsContainer>
        <Logs socket={socket} />
      </LogsContainer>
    </GridLayer>
  );
};
export default Game;
