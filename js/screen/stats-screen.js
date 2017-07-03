import changeView from '../template-render';
import ResultSuccessView from '../windows/result-success/result-success-view';
import application from '../application';

class StatsScreen {
  init(state) {
    this.view = new ResultSuccessView(state);
    changeView(this.view);
    this.view.onReplay = () => {
      application.showWelcome();
    };
  }
}

const statsScreen = new StatsScreen();
export default statsScreen;
