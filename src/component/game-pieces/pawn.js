import GamePiece from "./game-piece";
import { calcPawnMovement } from "../../helper/movement-helpers.js";
import { isEnPassantAvailable, doMovesMatch } from "../../helper/game-helpers";

class Pawn extends GamePiece {
  constructor(name, color, point, movement) {
    super(name, color, point, movement);
    this.moved = false;
    this.direction = this.color === "White" ? 1 : -1;
  }

  calculateAvailableMoves(grid, turnHistory, boolean, currentPoint = this.point) {
    const availableMoves = [];

    calcPawnMovement(grid, currentPoint, this.direction, this.moved, this.color, availableMoves);

    if (boolean) {
      let result;
      if (turnHistory !== undefined) {
        result = isEnPassantAvailable(turnHistory);
        if (result.result) {
          const targetSquare = result.enPassantSquare;
          if (availableMoves.length !== 0) {
            const [x, y] = availableMoves[0][0];
            const x1 = x + 1;
            const x2 = x - 1;
            const potential1 = [x1, y];
            const potential2 = [x2, y];
            if (doMovesMatch(potential1, targetSquare) || doMovesMatch(potential2, targetSquare)) {
              availableMoves.push([targetSquare, "enPassant"]);
            }
          }
        }
      }
    }

    return availableMoves;
  }
}

export default Pawn;
