import changeView from '../../template-render';
import WelcomeView from './welcome-view';
// import {initialState} from '../../data/game-data';
// import levelArtist from '../level-artist/level-artist';
import Application from '../../application';

/**
export default () => {
  const welcome = new WelcomeView();

  welcome.onStart = () => {
    changeView(levelArtist(initialState).element);
  };

  return welcome;
};
*/

class Welcome {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    changeView(this.view);
    this.view.onStart = () => {
      Application.showGame();
    };
  }
}

const welcome = new Welcome();
export default welcome;
