import welcomeScreen from './screen/welcome-screen';
import GameScreen from './screen/game-screen';
import statsScreen from './screen/stats-screen';
import Loader from './loader';
import {preprocessQuestions} from './game/game';

const ControllerID = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `statistics`
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);


class Application {

  loadQuestionsData() {
   // const preloaderRemove = this.showPreloader();
    Loader.loadData()
      .then((response)=>{
        this.setup(preprocessQuestions(response));
        this.changeController(getControllerIDFromHash(location.hash));
      });
    // this.setup(QuestAdapter.preprocess(json));
    // preloaderRemove();
    // this.changeController(getControllerIDFromHash(location.hash));
  }

  setup(data) {
    this.routes = {
      [ControllerID.WELCOME]: welcomeScreen,
      [ControllerID.GAME]: new GameScreen(data),
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
    this.loadQuestionsData();
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

export default application;
