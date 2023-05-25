import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import {
  Button,
  FlexContainer,
  Form,
  Heading,
  Input,
  ModalContainer,
} from "../styled-elements";

const ModalJoinGame = ({
  socket,
  child,
  onClose,
}: {
  socket: Socket;
  child: any;
  onClose: any;
}) => {
  const [userName, setUserName] = useState("");
  const [playerId, setPlayerId] = useState<number>();
  const [gameId, setGameId] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const handleGameIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setGameId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("join-game", token, gameId, userName);
    socket.on("player-joined", (_, userId) => {
      setPlayerId(userId);
    });
  };

  useEffect(() => {
    socket.on("error", (args) => {
      setError(args);
    });
  }, [error]);

  useEffect(() => {
    localStorage.setItem("gameId", JSON.stringify(gameId));
    localStorage.setItem("playerId", JSON.stringify(playerId));
    if (gameId && playerId) {
      navigate(`/game/${gameId}`);
    }
  }, [playerId]);

  return (
    <ModalContainer>
      <Heading fontSize="2.5em" color="#000000">
        Please enter your name and game ID
      </Heading>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          margin="0"
          placeholder="Game ID"
          onChange={(e) => handleGameIdChange(e)}
          type="string"
        />
        <FlexContainer
          flexDirection="row"
          justifyContent="space-between"
          width="50%"
          margin="2%"
        >
          <Button type="submit">Join Game</Button>
          <Button
            onClick={(e) => {
              onClose({ ...child, join: !child.join });
            }}
          >
            Close
          </Button>
        </FlexContainer>
      </Form>
      {error && <div>{error}</div>}
    </ModalContainer>
  );
};

export default ModalJoinGame;
