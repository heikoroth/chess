import * as BABYLON from "babylonjs";
import board from "../../assets/board.gltf";
import king from "../../assets/pieces/kingv3.gltf";
import queen from "../../assets/pieces/queenv3.gltf";
import bishop from "../../assets/pieces/bishopv3.gltf";
import knight from "../../assets/pieces/knightv3.gltf";
import rook from "../../assets/pieces/rookv3.gltf";
import pawn from "../../assets/pieces/pawnv3.gltf";
import { createMeshMaterials } from "./materials";
import { Scene } from "babylonjs/scene";
import { ISceneLoaderAsyncResult } from "babylonjs/Loading/sceneLoader";
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
import { AssetContainer } from "babylonjs";
import pawnAnimation from "../../assets/piece-animations/pawn-animation.gltf";
import rookAnimation from "../../assets/piece-animations/rook-animation.gltf";
import bishopAnimation from "../../assets/piece-animations/bishop-animation.gltf";
import knightAnimation from "../../assets/piece-animations/knight-animation.gltf";
import queenAnimation from "../../assets/piece-animations/queen-animation.gltf";

export const gameAssets = async (scene: Scene) => {
  const materials = createMeshMaterials(scene);
  //Game Scene
  let meshesToLoad = [king, queen, knight, bishop, rook, pawn];

  const loadedBoardMesh: ISceneLoaderAsyncResult =
    await BABYLON.SceneLoader.ImportMeshAsync("", board, "");

  const loadedMeshes: ISceneLoaderAsyncResult[] = await Promise.all(
    meshesToLoad.map((mesh) =>
      BABYLON.SceneLoader.ImportMeshAsync("", mesh, "")
    )
  );

  const loadedPawnAnimation: ISceneLoaderAsyncResult =
    await BABYLON.SceneLoader.ImportMeshAsync("", pawnAnimation, "");

  loadedPawnAnimation.animationGroups.forEach((animation) => {
    animation.loopAnimation = false;
  });

  const loadedRookAnimation: ISceneLoaderAsyncResult =
    await BABYLON.SceneLoader.ImportMeshAsync("", rookAnimation, "");

  loadedRookAnimation.animationGroups.forEach((animation) => {
    animation.loopAnimation = false;
  });

  const loadedBishopAnimation: ISceneLoaderAsyncResult =
    await BABYLON.SceneLoader.ImportMeshAsync("", bishopAnimation, "");

  loadedBishopAnimation.animationGroups.forEach((animation) => {
    animation.loopAnimation = false;
  });

  const loadedKnightAnimation: ISceneLoaderAsyncResult =
    await BABYLON.SceneLoader.ImportMeshAsync("", knightAnimation, "");

  loadedKnightAnimation.animationGroups.forEach((animation) => {
    animation.loopAnimation = false;
  });

  const loadedQueenAnimation: ISceneLoaderAsyncResult =
    await BABYLON.SceneLoader.ImportMeshAsync("", queenAnimation, "");

  loadedQueenAnimation.animationGroups.forEach((animation) => {
    animation.loopAnimation = false;
  });

  const piecesMeshes: ChessPieceMesh[] = [];
  const boardMeshes: AbstractMesh[] = [];
  const animations = {
    Pawn: loadedPawnAnimation,
    Rook: loadedRookAnimation,
    Bishop: loadedBishopAnimation,
    Knight: loadedKnightAnimation,
    Queen: loadedQueenAnimation,
  };

  const loadMeshSettings = (mesh: any, color: string) => {
    const name: string = mesh.meshes[1].id;
    let finalMesh: ChessPieceMesh = mesh.meshes[1].clone(name, null)!;
    finalMesh.name = name;
    finalMesh.color = color;
    finalMesh.isPickable = true;
    (finalMesh.isVisible = false), (finalMesh.scalingDeterminant = 50);
    finalMesh.position.y = 0.5;
    finalMesh.name === "Knight" && finalMesh.color === "White"
      ? (finalMesh.rotation = new BABYLON.Vector3(0, Math.PI, 0))
      : null;
    finalMesh.color === "White"
      ? (finalMesh.material = materials.white)
      : (finalMesh.material = materials.black);

    return piecesMeshes.push(finalMesh);
  };

  //Sort the loaded meshes
  loadedMeshes.forEach((mesh) => {
    loadMeshSettings(mesh, "White");
    loadMeshSettings(mesh, "Black");
  });

  loadedBoardMesh.meshes.forEach((mesh, idx) => {
    mesh.isPickable = false;
    if (idx !== 1) {
      mesh.material = materials.board;
    }
    boardMeshes.push(mesh);
  });

  return { piecesMeshes, boardMeshes, animations };
};

export interface CustomScene extends Scene {
  finalMeshes?: {
    piecesMeshes: ChessPieceMesh[];
    boardMeshes: AbstractMesh[];
    animations: Animation;
  };
  meshesToRender?: AbstractMesh[];
  animationsContainer?: Animation;
}

export interface ChessPieceMesh extends AbstractMesh {
  name: string;
  color?: string;
}

type Animation = {
  Pawn: AssetContainer | ISceneLoaderAsyncResult;
  Bishop: AssetContainer | ISceneLoaderAsyncResult;
  Rook: AssetContainer | ISceneLoaderAsyncResult;
  Knight: AssetContainer | ISceneLoaderAsyncResult;
  Queen: AssetContainer | ISceneLoaderAsyncResult;
};
