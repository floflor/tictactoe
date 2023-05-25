import { useEffect, useState } from "react";
import {
  Button,
  FlexContainer,
  Heading,
} from "../../components/styled-elements";
import ModalStart from "../../components/Modal/ModalStart";
import ModalJoin from "../../components/Modal/ModalJoin";
import { Socket } from "socket.io-client";
import ModalLogin from "../../components/Modal/ModalLogin";
import ModalSignup from "../../components/Modal/ModalSignup";
import { useNavigate } from "react-router-dom";

const Landing = ({ socket }: { socket: Socket }) => {
  const [email, setEmail] = useState("");

  const [modal, setModal] = useState({
    join: false,
    login: false,
    signup: false,
  });
  const [error, setError] = useState(false);
  const [gameId, setGameId] = useState<number>();
  const [playerId, setPlayerId] = useState<number>();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const lsEmail = localStorage.getItem("email");
    if (lsEmail) {
      setEmail(lsEmail);
    }
    if (gameId && playerId) {
      navigate(`/game/${gameId}`);
    }
  }, [email, modal, gameId]);

  const handleOpenModal = (event: React.MouseEvent, modalType: string) => {
    event.preventDefault();
    if (modalType === "join") {
      setModal({ ...modal, join: true });
    }
    if (modalType === "login") {
      setModal({ ...modal, login: true });
    }
    if (modalType === "signup") {
      setModal({ ...modal, signup: true });
    }
  };
  const handleStartGame = (e: React.MouseEvent) => {
    e.preventDefault();
    socket.emit("start-game", token, email);
    socket.on("game-started", (gameId, userId) => {
      setGameId(gameId);
      setPlayerId(userId);
      localStorage.setItem("gameId", JSON.stringify(gameId));
      localStorage.setItem("playerId", JSON.stringify(userId));
    });
    socket.on("error", (args) => {
      if (args === "Invalid token") {
        setError(true);
      }
    });
  };
  useEffect(() => {}, [error]);
  return (
    <FlexContainer
      minHeight="100vh"
      backgroundColor="black"
      justifyContent="center"
    >
      <FlexContainer width="80%" heigth="60%" color={"white"}>
        <Heading>TIC TAC TOE</Heading>
        <FlexContainer
          flexDirection="row"
          color="white"
          width="60%"
          justifyContent="space-around"
          border="2px solid white"
          heigth="10vh"
        >
          {email && !error ? (
            <>
              <Button onClick={(e) => handleStartGame(e)}>Start Game</Button>
              <Button onClick={(e) => handleOpenModal(e, "join")}>
                Join Game
              </Button>
            </>
          ) : (
            <>
              <Button onClick={(e) => handleOpenModal(e, "login")}>
                Login
              </Button>
              <Button onClick={(e) => handleOpenModal(e, "signup")}>
                Sign Up
              </Button>
            </>
          )}
        </FlexContainer>
      </FlexContainer>
      {modal.join && (
        <ModalJoin socket={socket} child={modal} onClose={setModal} />
      )}
      {modal.login && <ModalLogin child={modal} onClose={setModal} />}
      {modal.signup && <ModalSignup child={modal} onClose={setModal} />}
    </FlexContainer>
  );
};
export default Landing;
