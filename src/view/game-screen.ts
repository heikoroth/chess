import * as BABYLON from "babylonjs";
import assetsLoader from "./asset-loader";
import space from "../../assets/space.webp";
import { createMovementMaterials } from "../component/materials";
import { Engine } from "babylonjs/Engines/engine";
import { CustomScene } from "./start-screen";

const gameScreen = async (
  canvas: HTMLCanvasElement,
  engine: Engine
): Promise<CustomScene> => {
  const scene: CustomScene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI,
    Math.PI / 4,
    35,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = 25;
  camera.upperRadiusLimit = 200;

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 100, 0),
    scene
  );
  light.intensity = 0.6;

  const light2 = new BABYLON.SpotLight(
    "spotLight",
    new BABYLON.Vector3(0, 0, 30),
    new BABYLON.Vector3(0, 0, -30),
    90,
    1,
    scene
  );
  light2.intensity = 0.8;
  light2.diffuse = new BABYLON.Color3(0, 0, 0);

  const light3 = new BABYLON.SpotLight(
    "spotLight2",
    new BABYLON.Vector3(0, 0, -30),
    new BABYLON.Vector3(0, 0, 30),
    90,
    1,
    scene
  );
  light3.intensity = 0.8;
  light3.diffuse = new BABYLON.Color3(0, 0, 0);

  const photoDome = new BABYLON.PhotoDome(
    "spaceDome",
    space,
    { size: 500 },
    scene
  );
  photoDome.rotation = new BABYLON.Vector3(0, 1, 1.5);

  createMovementMaterials(scene);

  scene.finalMeshes = await assetsLoader(scene, "gameScreen");

  return scene;
};

export default gameScreen;
