
import Board from "../../components/Board/Board";
import { Socket } from "socket.io-client";
import {
  BoardContainer,
  Button,
  FlexContainer,
  GridLayer,
  Heading,
  LogsContainer,
  Text,
} from "../../components/styled-elements";
import Logs from "../../components/Logs/Logs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Game = ({ socket }: { socket: Socket }) => {
  const [gameFinished, setGameFinished] = useState(false);
  const [winner, setWinner] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("game-finished", (args) => {
      setGameFinished(true);
      if (args !== "No more moves") {
        setWinner(args);
      }
    });
  }, [gameFinished]);
  return (
    <>
      {!gameFinished ? (
        <GridLayer>
          <BoardContainer>
            <Board socket={socket} />
          </BoardContainer>
          <LogsContainer>
            <Logs socket={socket} />
          </LogsContainer>
        </GridLayer>
      ) : (
        <FlexContainer
          minHeight="100vh"
          backgroundColor="#000000"
          justifyContent="center"
          alignItems="center"
          color="#FFFFFF"
        >
          <Heading fontSize="5em">Game Finished</Heading>
          {winner && (
            <Text>Winner: {winner === "local" ? "Player Two" : winner}!</Text>
          )}
          <Text>No more moves</Text>
          <Button onClick={()=>navigate("/")}>Return Home!</Button>
        </FlexContainer>
      )}
    </>
  );
};
export default Game;
