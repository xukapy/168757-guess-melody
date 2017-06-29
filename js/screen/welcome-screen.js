import changeView from '../template-render';
import WelcomeView from '../windows/welcome/welcome-view';
import Application from '../application';

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
