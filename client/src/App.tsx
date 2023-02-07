import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Landing from "./pages/Landing/Landing";
import Game from "./pages/Game/Game";
import { Socket } from "socket.io-client";

function App({ socket }: { socket: Socket }) {
  const [socketInstance, setSocket] = useState<any>(null);

  useEffect(() => {
    setSocket(socket);
    socket.connect();

    return () => {
      socket.close();
    };
  }, [setSocket]);

  return (
    <Router>
      <div className="App">
        {socketInstance ? (
          <Routes>
            <Route path="/" element={<Landing socket={socketInstance} />} />
            <Route
              path="/game/:id"
              element={<Game socket={socketInstance} />}
            />
          </Routes>
        ) : (
          <div>Socket not connected</div>
        )}
      </div>
    </Router>
  );
}

export default App;
