import LevelArtistView from '../windows/level-artist/level-artist-view';
import LevelGenreView from '../windows/level-genre/level-genre-view';
import ResultLossView from '../windows/result-loss/result-loss-view';
import changeView from '../template-render';
import {initialState, questions} from '../data/game-data';
import {checkLastLevel, checkAnswer, nextLevel, minusLives} from '../game/game';
import application from '../application';

class GameScreen {
  constructor() {
    this.startGame();
  }

  init() {
    changeView(this.view);
    this.view.onAnswer = (answer) => {
      this.view.unbind();

      if (checkAnswer(questions[this.state.level], answer)) {
        this.levelUp();
      } else {
        this.die();
      }
    };
  }

  levelUp() {
    this.state = nextLevel(this.state);
    if (!checkLastLevel(this.state)) {
      this.view = this.createLevel();
      this.init();
    } else {
      this.win();
    }
  }

  win() {
    this.startGame();
    application.showStats();
  }

  die() {
    this.state = minusLives(this.state);
    if (this.state.lives === 0) {
      this.loose();
    } else {
      this.init();
    }
  }

  loose() {
    this.startGame();
    const resultLossView = new ResultLossView();
    resultLossView.onReplay = () => {
      application.showWelcome();
    };
    changeView(resultLossView);
  }

  startGame() {
    this.state = Object.assign({}, initialState);
    this.view = this.createLevel(this.state);
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
