import { renderScene } from "./helper/canvas-helpers";
import Game from "./game";
import chessData from "./data/chess-data-import";
import startScreen from "./view/start-screen";
import gameScreen from "./view/game-screen";
import activateEmitter from "./events/emitter";
import createGUI from "./view/gui-overlay";
import inputController from "../src/events/input-controller";
import activateSocket from "../server/sockets";

const initializeApp = async (canvas, engine) => {
  const app = {
    game: new Game(chessData),
    gameMode: { mode: undefined, player: undefined, room: undefined },
    showScene: { index: 0 },
    scenes: {
      startScene: await startScreen(canvas, engine),
      gameScene: await gameScreen(canvas, engine),
    },
  };

  const {
    game,
    gameMode,
    showScene,
    scenes: { startScene, gameScene },
  } = app;

  app.emitter = activateEmitter(game, gameMode, gameScene);
  //appContext.socket = activateSocket(game, gameMode, gameScene);
  createGUI(startScene, gameScene, showScene, gameMode, app.emitter, app.socket, game);
  renderScene(game, gameScene);

  gameScene.onPointerDown = async (e, pickResult) => {
    const mesh = pickResult.pickedMesh;
    const isCompleteMove = inputController(mesh, game, gameMode, gameScene);
    isCompleteMove
      ? (() => {
          const [origin, target] = game.moves;
          app.emitter.emit("playerMove", origin, target);
        })()
      : null;
  };

  return app;
};

export default initializeApp;
