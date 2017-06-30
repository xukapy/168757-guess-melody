import changeView from '../template-render';
import WelcomeView from '../windows/welcome/welcome-view';
import application from '../application';

class Welcome {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    changeView(this.view);
    this.view.onStart = () => {
      application.showGame();
    };
  }
}

const welcome = new Welcome();
export default welcome;
