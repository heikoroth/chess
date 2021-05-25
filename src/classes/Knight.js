import GamePiece from "./GamePiece";
import { calcKnightMovement } from "../helper/movementFunctions";

class Knight extends GamePiece {
  constructor(name, color, point, movement) {
    super(name, color, point, movement);
    this.moved = false;
  }
  calculateAvailableMoves(currentPoint, grid) {
    const knightMoves = [
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [-1, -2],
    ];
    const availableMoves = [];

    calcKnightMovement(grid, currentPoint, this.color, knightMoves, availableMoves);

    return availableMoves;
  }
}

export default Knight;
