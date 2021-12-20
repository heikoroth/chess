import * as BABYLON from "babylonjs";
import space from "../../assets/space.webp";
import assetsLoader from "./asset-loader";
import { Scene } from "babylonjs/scene";
import { ChessPieceMesh } from "../view/asset-loader";
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
import { Engine } from "babylonjs/Engines/engine";
import { AssetContainer } from "babylonjs";

const startScreen = async (engine: Engine): Promise<CustomScene> => {
  const scene: CustomScene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 1,
    Math.PI / 3.5,
    33,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.useFramingBehavior = false;

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  const photoDome = new BABYLON.PhotoDome(
    "spaceDome",
    space,
    { size: 250 },
    scene
  );

  scene.finalMeshes = await assetsLoader(scene, "startScreen");

  return scene;
};

export interface CustomScene extends Scene {
  finalMeshes?: {
    piecesMeshes: ChessPieceMesh[];
    boardMeshes: AbstractMesh[];
    animations?: {
      Pawn: BABYLON.ISceneLoaderAsyncResult;
      Queen: BABYLON.ISceneLoaderAsyncResult;
    };
  };
  meshesToRender?: AbstractMesh[];
  animationContainer?: AssetContainer;
}

export default startScreen;
