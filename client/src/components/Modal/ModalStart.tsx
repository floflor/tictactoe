/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { Button, Form, Heading, ModalContainer } from "../styled-elements";

const ModalStartGame = ({
  socket,
  child,
  onClose,
}: {
  socket: Socket ;
  child: any;
  onClose: any;
}) => {
  const [userName, setUserName] = useState("");
  const [gameId, setGameId] = useState<number>();
  const [playerId, setPlayerId] = useState<number>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUserNameChange = (e: any) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const handleSubmit = (e: any) => {
    console.log(socket)
    e.preventDefault();
    socket.emit("start-game", userName);
    socket.on("game-started", (gameId, userId) => {
      setGameId(gameId);
      setPlayerId(userId);
    });
  };
  useEffect(() => {
    localStorage.setItem("gameId", JSON.stringify(gameId));
    localStorage.setItem("playerId", JSON.stringify(playerId));
    if (gameId && playerId) {
      navigate(`/game/${gameId}`);
    }
  }, [gameId]);

  useEffect(() => {
    socket.on("error", (args) => {
      setError(args);
    });
  }, [error]);

  return (
    <ModalContainer>
      <Heading fontSize="3em" color="#000000">
        Please enter your name
      </Heading>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <input placeholder="Player Name" onChange={(e) => handleUserNameChange(e)} type="text" />
        <Button type="submit">Start Game</Button>
        <button
          onClick={(e) => {
            try {
              onClose({ ...child, start: !child.start });
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Close
        </button>
      </Form>
      {error && <div>{error}</div>}
    </ModalContainer>
  );
};

export default ModalStartGame;
