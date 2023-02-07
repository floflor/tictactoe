/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { Button, ModalContainer } from "../styled-elements";

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
  const navigate = useNavigate();

  const handleUserNameChange = (e: any) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const handleGameIdChange = (e: any) => {
    e.preventDefault();
    setGameId(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    socket.emit("join-game", gameId, userName);
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
  }, [error, playerId]);

  return (
    <ModalContainer>
      <h1>Please enter your name</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={(e) => handleGameIdChange(e)} type="text" />
        <input onChange={(e) => handleUserNameChange(e)} type="text" />
        <Button type="submit">Join Game</Button>
        <button
          onClick={(e) => {
            onClose({ ...child, join: !child.join });
          }}
        >
          Close
        </button>
      </form>
      {error && <div>{error}</div>}
    </ModalContainer>
  );
};

export default ModalJoinGame;
