import board from "../../assets/board.gltf";
import pawnWhite from "../../assets/white pieces/pawn-white.gltf";
import rookWhite from "../../assets/white pieces/rook-white.gltf";
import bishopWhite from "../../assets/white pieces/bishop-white.gltf";
import knightWhite from "../../assets/white pieces/knight-white.gltf";
import kingWhite from "../../assets/white pieces/king-white.gltf";
import queenWhite from "../../assets/white pieces/queen-white.gltf";
import pawnBlack from "../../assets/black pieces/pawn-black.gltf";
import rookBlack from "../../assets/black pieces/rook-black.gltf";
import bishopBlack from "../../assets/black pieces/bishop-black.gltf";
import knightBlack from "../../assets/black pieces/knight-black.gltf";
import kingBlack from "../../assets/black pieces/king-black.gltf";
import queenBlack from "../../assets/black pieces/queen-black.gltf";

const assetsLoader = async (BABYLON) => {
  let meshesToLoad = [
    board,
    pawnWhite,
    rookWhite,
    bishopWhite,
    knightWhite,
    kingWhite,
    queenWhite,
    pawnBlack,
    rookBlack,
    bishopBlack,
    knightBlack,
    kingBlack,
    queenBlack,
  ];

  const meshesLoader = await Promise.all(meshesToLoad.map((mesh) => BABYLON.SceneLoader.ImportMeshAsync("", mesh, "")));

  const finalMeshList = [[], [], []];

  //Sort the loaded meshes
  meshesLoader.forEach((mesh) => {
    if (mesh.meshes[1].id.includes("-")) {
      let finalMesh = mesh.meshes[1];
      [finalMesh.name, finalMesh.color, finalMesh.isPickable = false] = finalMesh.id.split("-");

      return finalMesh.color === "White"
        ? finalMeshList[0].push(finalMesh)
        : finalMesh.color === "Black"
        ? finalMeshList[1].push(finalMesh)
        : finalMeshList[2].push(mesh.meshes);
    }
    mesh.meshes.forEach((mesh) => (mesh.isPickable = true));
    finalMeshList[2].push(mesh.meshes);
  });

  //Clone needed pieces
  const teams = 2;
  const clonesNeeded = {
    Pawn: 7,
    Rook: 1,
    Bishop: 1,
    Knight: 1,
  };

  for (let i = 0; i < teams; i++) {
    Object.entries(clonesNeeded).forEach(([key, value]) => {
      let meshToClone = finalMeshList[i].find((mesh) => mesh.name === key);
      for (let j = 0; j < value; j++) {
        let clone = meshToClone.clone(key);
        finalMeshList[i].push(clone);
      }
    });
  }
  return finalMeshList;
};

export default assetsLoader;