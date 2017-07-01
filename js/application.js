import welcomeScreen from './screen/welcome-screen';
import gameScreen from './screen/game-screen';
import statsScreen from './screen/stats-screen';

const ControllerID = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `statistics`
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);


class Application {

  constructor() {
    this.routes = {
      [ControllerID.WELCOME]: welcomeScreen,
      [ControllerID.GAME]: gameScreen,
      [ControllerID.STATS]: statsScreen,
    };

    window.onhashchange = () => {
      this.changeController(getControllerIDFromHash(location.hash));
    };
  }

  changeController(route = ControllerID.WELCOME) {
    const controller = this.routes[route];
    controller.init();
  }

  init() {
    this.changeController(getControllerIDFromHash(location.hash));
  }

  showWelcome() {
    location.hash = ControllerID.WELCOME;
  }

  showGame() {
    location.hash = ControllerID.GAME;
  }

  showStats() {
    location.hash = ControllerID.STATS;
  }

}

const application = new Application();
application.init();

export default application;
