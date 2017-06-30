import welcomeScreen from './screen/welcome-screen';
import gameScreen from './screen/game-screen';
import statsScreen from './screen/stats-screen';

export default class Application {

  static showWelcome() {
    welcomeScreen.init();
  }

  static showGame() {
    gameScreen.init();
  }

  static showStats(stats) {
    statsScreen.init(stats);
  }

}
