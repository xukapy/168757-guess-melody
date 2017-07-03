import AbstractView from '../../view';
import timeFormat from '../../time-format';
import gameSettings from '../../data/game-settings';
import initializeCountdown from '../../timer';
import initializePlayer from '../../player';

const drawTimer = (time) => {
  const timeLeft = timeFormat(gameSettings.time, time);
  return `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle
  cx="390" cy="390" r="370"
  class="timer-line"
  style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
    <span class="timer-value-mins">${timeLeft.minutes}</span><!--
      --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">${timeLeft.seconds}</span>
    </div>
    </svg>`;
};

export default class LevelArtistView extends AbstractView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
  }
  get template() {
    const questionString = this.question.artists.map((artist, index) => `        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="val-${index + 1}" />
          <label class="main-answer" for="answer-${index + 1}">
            <img class="main-answer-preview" src="">
            ${artist}
          </label>
        </div>`).join(``);
    /**
     * Строим представление
     */
    return `  <!-- Выбор исполнителя: уровень -->
<section class="main main--level main--level-artist">
  ${drawTimer(this.state.time)}
   <div class="main-wrap">
      <div class="main-timer"></div>

      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper"></div>
      <form class="main-list">
      ${questionString}
      </form>
    </div>
</section>`;
  }
  /**
   * Экран второй игры .main--level-genre должен показываться по нажатию
   * на любой из вариантов ответа — блок .main-answer на первом игровом экране.
   */
  bind() {
    this._removePlayer = initializePlayer(this.element.querySelector(`.player-wrapper`), this.question.song.src);
    this._removeTimer = initializeCountdown(this.element, this.state.time / 1000, gameSettings.time / 1000);

    const inputAnswerList = this.element.querySelectorAll(`.main-answer-wrapper`);
    let i = 1;
    for (const inputAnswer of inputAnswerList) {
      const answer = {type: `artist`, answer: i++};
      inputAnswer.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.onAnswer(answer);
      });
    }
  }

  unbind() {
    this._removeTimer();
    this._removePlayer();
  }

  onAnswer(answer) {
    // Будет переопределен в классе контроллера
  }
}
