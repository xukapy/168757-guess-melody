import AbstractView from '../../view';
import gameSettings from '../../data/game-settings';
import {calcStatistics} from '../../game/game';
import Loader from '../../loader';

export default class ResultSuccessView extends AbstractView {

  constructor(state) {
    super();
    this.state = state;
    this.stat = 100;
    Loader.loadResults()
      .then((statistics)=>{
        this.stat = calcStatistics(this.state, statistics);
      })
      .then(Loader.saveResults(this.state));
  }

  timeTemplate(time) {
    let timeString = ``;
    const minutes = parseInt(time / 1000 / 60, 10);
    const seconds = parseInt((time - minutes * 60 * 1000) / 1000, 10);
    if (minutes === 1) {
      timeString = timeString + `1&nbsp;минуту`;
    } else if (minutes === 2) {
      timeString = timeString + `2&nbsp;минуты`;
    }
    if (seconds !== 0) {
      timeString = timeString + ` и ` + seconds + `&nbsp;секунд`;
    }
    return timeString;
  }

  get template() {
    return `  <!-- Результат игры -->
      <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;${this.timeTemplate(this.state.time)}<br>вы&nbsp;отгадали ${gameSettings.maxlevel + this.state.lives - gameSettings.lives}&nbsp;мелодии</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this.stat}%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  bind() {
    this.element.querySelector(`.main-replay`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onReplay();
    });

  }

  onReplay() {
    // Будет переопределен в классе контроллера
  }
}
