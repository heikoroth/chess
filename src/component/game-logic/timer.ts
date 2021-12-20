import { State } from "./chess-data-import";

interface Timer {
  gameState: State;
  timer1: number;
  timer2: number;
  gameStarted: boolean;
  gamePaused: boolean;
  pauseId: NodeJS.Timeout;
  endMatch: () => void;
}

class Timer {
  constructor(gameState: State, endMatch: () => void) {
    this.gameState = gameState;
    this.timer1 = 0;
    this.timer2 = 0;
    this.gameStarted = false;
    this.gamePaused = false;
    this.pauseId;
    this.endMatch = endMatch;
  }

  resetTimers = (time = 0) => {
    this.timer1 = time / 2;
    this.timer2 = time / 2;
    this.gameStarted = false;
  };

  padZero = (number: number) => {
    if (number < 10) {
      return parseInt("0" + number);
    }
    return number;
  };

  pauseTimer = () => {
    if (this.gamePaused === false) {
      this.gamePaused = true;
    } else {
      if (this.pauseId) {
        clearTimeout(this.pauseId);
      }
      this.pauseId = setTimeout(() => {
        this.gamePaused = false;
        this.startTimer(this.timer1 + this.timer2);
      }, 1000);
    }
  };

  startTimer = (time = 0) => {
    if (!this.gameStarted) {
      this.timer1 = time / 2;
      this.timer2 = time / 2;
      this.gameStarted = true;
    }
    if (time > 0) {
      let timerId = setInterval(() => {
        if (this.gameState.currentPlayer === "White") {
          this.timer1 = this.padZero(this.timer1 - 1);
          this.timer1 === 0 ? this.endOfMatch() : null;
        }
        if (this.gameState.currentPlayer !== "White") {
          this.timer2 = this.padZero(this.timer2 - 1);
          this.timer2 === 0 ? this.endOfMatch() : null;
        }
        if (this.gameStarted === false || this.gamePaused === true) {
          clearInterval(timerId);
        }
      }, 1000);
    }
  };

  endOfMatch() {
    this.gameStarted = false;
    this.endMatch();
  }
}

export default Timer;