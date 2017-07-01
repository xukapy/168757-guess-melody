import changeView from '../template-render';
import ResultSuccessView from '../windows/result-success/result-success-view';
import application from '../application';

class StatsScreen {
  constructor() {
    this.view = new ResultSuccessView();
  }

  init() {
    changeView(this.view);
    this.view.onReplay = () => {
      application.showWelcome();
    };
  }
}

const statsScreen = new StatsScreen();
export default statsScreen;
