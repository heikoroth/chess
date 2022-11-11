import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/loading-screen";
import { Home } from "./routes/home";
import { Lobby } from "./routes/lobby";
import { SceneManager } from "./components/scene-manager";
import { GameView } from "./routes/game-view";
import { io } from "socket.io-client";

const App: React.FC = () => {
  const [socket, setSocket] = useState(
    io(`ws://${window.location.host}`, {
      transports: ["websocket"],
    })
  );
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneManagerRef = useRef<SceneManager>();

  useEffect(() => {
    if (canvasRef.current && !sceneManagerRef.current) {
      initScene();
      async function initScene() {
        sceneManagerRef.current = new SceneManager(canvasRef.current!);
        await sceneManagerRef.current.init();
        setIsLoading(false);
      }
    }
  }, [canvasRef.current]);

  return (
    <div id="app">
      <canvas ref={canvasRef}></canvas>
      {!isLoading ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby socket={socket} />} />
          <Route
            path="/game"
            element={
              sceneManagerRef.current && (
                <GameView sceneManager={sceneManagerRef.current} />
              )
            }
          />
        </Routes>
      ) : (
        <div className="loadingContainer">
          <LoadingScreen text="..." />
        </div>
      )}
    </div>
  );
};

export default App;

export interface UserData {
  [key: string]: string;
  picture: string;
  name: string;
}
