import changeView from '../template-render';
import ResultSuccessView from '../windows/result-success/result-success-view';
import Application from '../application';

class StatsScreen {
  constructor() {
    this.view = new ResultSuccessView();
  }

  init() {
    changeView(this.view);
    this.view.onReplay = () => {
      Application.showWelcome();
    };
  }
}

const statsScreen = new StatsScreen();
export default statsScreen;
