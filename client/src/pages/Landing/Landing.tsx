import { useEffect, useState } from "react";
import {
  Button,
  FlexContainer,
  Heading,
} from "../../components/styled-elements";
import ModalStart from "../../components/Modal/ModalStart";
import ModalJoin from "../../components/Modal/ModalJoin";
import { Socket } from "socket.io-client";

const Landing = ({ socket }: { socket: Socket }) => {
  console.log(socket);
  const [modal, setModal] = useState({ start: false, join: false });

  const handleOpenModal = (event: React.MouseEvent, modalType: string) => {
    event.preventDefault();
    if (modalType === "start") {
      setModal({ ...modal, start: true });
    }
    if (modalType === "join") {
      setModal({ ...modal, join: true });
    }
  };

  useEffect(() => {}, [modal.start]);
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
          <Button onClick={(e) => handleOpenModal(e, "start")}>
            Start Game
          </Button>
          <Button onClick={(e) => handleOpenModal(e, "join")}>Join Game</Button>
        </FlexContainer>
      </FlexContainer>
      {modal.start && (
        <ModalStart socket={socket} child={modal} onClose={setModal} />
      )}
      {modal.join && (
        <ModalJoin socket={socket} child={modal} onClose={setModal} />
      )}
    </FlexContainer>
  );
};
export default Landing;
