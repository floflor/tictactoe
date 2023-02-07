import styled from "styled-components";
import Board from "../../components/Board/Board";
import { Socket } from "socket.io-client";

const GridLayer = styled.div((props) => ({
  width: "100%",
  height: "100vh",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "1fr",
}));

const BoardContainer = styled.div((props) => ({
  width: "100%",
  height: "100%",
  gridArea: "1 / 1 / 2 / 3",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "black",
}));

const LogsContainer = styled.div((props) => ({
  width: "100%",
  height: "100%",
  gridArea: "1 / 3 / 2 / 4",
  backgroundColor: "white",
}));

const Game = ({ socket }: { socket: Socket }) => {
  return (
    <GridLayer>
      <BoardContainer>
        <Board socket={socket} />
      </BoardContainer>
      {/* Aca van los errores y si gana un jugador , escuchar errores aca o en otro componente  */}
      <LogsContainer />
    </GridLayer>
  );
};
export default Game;
