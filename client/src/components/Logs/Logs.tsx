
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { FlexContainer, Heading, Line, Text } from "../styled-elements";

const Logs = ({ socket }: { socket: Socket }) => {
  const [errors, setErrors] = useState<string>("");
  const gameId = JSON.parse(localStorage.getItem("gameId") as string);

  useEffect(() => {
    socket.on("error", (args: string) => {
      setErrors(args);
    });
    setTimeout(() => {
      setErrors("");
    }, 5000);
  }, [errors]);

  useEffect(() => {
    socket.on("game-finished", (args) => {
      localStorage.removeItem("playerId");
      localStorage.removeItem("localId");
    });
  }, []);

  return (
    <FlexContainer>
      <Heading color="#000000" fontSize="3em">
        Game ID: {gameId}
      </Heading>
      <Line width="60%" />
      <Heading color="#000000" fontSize="3em">
        Alerts
      </Heading>
      <Line width="60%" />
      {errors && (
        <FlexContainer
          width="80%"
          border="2px solid black"
          margin="5% 0 0 5%"
          heigth="10vh"
          justifyContent="center"
          alignItems="center"
          backgroundColor="#000000"
        >
          <Text fontSize="1.5em" color="#FFFFFF">
            {errors}
          </Text>
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default Logs;
