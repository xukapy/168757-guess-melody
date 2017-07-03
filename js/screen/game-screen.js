import LevelArtistView from '../windows/level-artist/level-artist-view';
import LevelGenreView from '../windows/level-genre/level-genre-view';
import ResultLossView from '../windows/result-loss/result-loss-view';
import changeView from '../template-render';
import {initialState} from '../data/game-data';
import {checkLastLevel, checkAnswer, nextLevel, minusLives, checkTimeExpire} from '../game/game';
import application from '../application';

export default class GameScreen {
  constructor(questions) {
    this.questions = questions;
    this.startGame();
  }

  init() {
    changeView(this.view);
    this.startLeveLTime = Date.now();
    this.view.onAnswer = (answer) => {
      this.view.unbind();
      if (checkAnswer(this.questions[this.state.level], answer)) {
        this.levelUp();
      } else {
        this.die();
      }
    };
  }

  levelUp() {
    this.state.time = this.state.time + Date.now() - this.startLeveLTime;
    this.state = nextLevel(this.state);
    if (checkTimeExpire(this.state)) {
      this.loose();
    }
    if (!checkLastLevel(this.state)) {
      this.view = this.createLevel();
      this.init();
    } else {
      this.win();
    }
  }

  win() {
    const winState = Object.assign({}, this.state);
    // Подготовка презентера игры к новой игре, хотя вопросы надо перекачать
    this.startGame();
    application.showStats(winState);
  }

  die() {
    this.state = minusLives(this.state);
    if (this.state.lives === 0) {
      this.loose();
    } else {
      this.levelUp();
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


  createLevel() {
    let level;
    if (this.questions[this.state.level].type === `artist`) {
      level = new LevelArtistView(this.state, this.questions[this.state.level]);
    } else {
      level = new LevelGenreView(this.state, this.questions[this.state.level]);
    }
    return level;
  }

}
