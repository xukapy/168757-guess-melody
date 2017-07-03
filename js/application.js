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

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``).split(`?`)[0];
const getStateFromHash = (hash) => {
  let encodedState = hash.split(`?`)[1];
  if (encodedState) {
    return JSON.parse(decodeURIComponent(encodedState));
  }
  return null;
};

class Application {

  loadQuestionsData() {
   // const preloaderRemove = this.showPreloader();
    Loader.loadData()
      .then((response)=>{
        this.setup(preprocessQuestions(response));
        this.changeController(getControllerIDFromHash(location.hash), getStateFromHash(location.hash));
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
      this.changeController(getControllerIDFromHash(location.hash), getStateFromHash(location.hash));
    };
  }

  changeController(route = ControllerID.WELCOME, state) {
    const controller = this.routes[route];
    if (state) {
      controller.init(state);
    } else {
      controller.init();
    }
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

  showStats(state) {
    location.hash = ControllerID.STATS + `?` + encodeURIComponent(JSON.stringify(state));
  }

}

const application = new Application();

export default application;
