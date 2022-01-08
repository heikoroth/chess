import * as BABYLON from "babylonjs";
import space from "../../assets/space.webp";
import assetsLoader, { CustomStartScene } from "./asset-loader";
import { Engine } from "babylonjs/Engines/engine";

const startScreen = async (engine: Engine): Promise<CustomStartScene> => {
  const scene: CustomStartScene = new BABYLON.Scene(engine);
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

export default startScreen;
