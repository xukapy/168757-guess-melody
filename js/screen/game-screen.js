import LevelArtistView from '../windows/level-artist/level-artist-view';
import LevelGenreView from '../windows/level-genre/level-genre-view';
import ResultLossView from '../windows/result-loss/result-loss-view';
import changeView from '../template-render';
import {initialState, questions} from '../data/game-data';
import {checkLastLevel, checkAnswer, nextLevel} from '../game/game';
import Application from '../application';

class GameScreen {
  constructor() {
    // level 0
    this.state = initialState;
    this.view = this.createLevel(this.state);
  }

  init() {
    changeView(this.view);
    this.view.onAnswer = (answer) => {
      const result = checkAnswer(questions[this.state.level], answer);
      const isLastLevel = checkLastLevel(this.state);

      if (result && !isLastLevel) {
        this.levelUp();
      } else if (result && isLastLevel) {
        this.win();
      } else if (!result && this.state.lives === 1) {
        this.loose();
      }

      this.init();
    };
  }

  levelUp() {
    this.state = nextLevel(this.state);
    this.view = this.createLevel();
  }

  win() {
    Application.showStats();
  }

  loose() {
    this.view = new ResultLossView();
    this.view.onReplay = () => {
      // this.state = initialState;
      // this.view = this.createLevel();
      // this.init();
      Application.showWelcome();
    };
  }

  startGame() {

  }

  stopGame() {

  }

  createLevel() {
    let level;
    if (questions[this.state.level].type === `artist`) {
      level = new LevelArtistView(this.state, questions[this.state.level]);
    } else {
      level = new LevelGenreView(this.state, questions[this.state.level]);
    }
    return level;
  }

}

const gameScreen = new GameScreen();
export default gameScreen;
