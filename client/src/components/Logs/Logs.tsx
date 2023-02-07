import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const Logs = ({ socket }: { socket: Socket }) => {
  const [errors, setErrors] = useState("");
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    socket.on("error", (args) => {
      setErrors(args);
    });
  }, [errors]);
  return (
    <div>
      {gameFinished ? (
        <>
          <div>GAME FINISHED! WINNER: </div>
        </>
      ) : (
        <>
          <h1>Messages</h1>
          <div>{errors}</div>
        </>
      )}
    </div>
  );
};

export default Logs;
