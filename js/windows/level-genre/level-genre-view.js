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

export default class LevelGenreView extends AbstractView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
    this._removePlayer = [];
  }
  get template() {
    const questionString = this.question.songs.map((artist, index) => `      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-${index + 1}" id="a-${index + 1}">
        <label class="genre-answer-check" for="a-${index + 1}"></label>
      </div>`).join(``);
    /**
     * Строим представление
     */
    return `  <!-- Игра на выбор жанра -->
  <section class="main main--level main--level-genre">
  ${drawTimer(this.state.time)}
  <div class="main-wrap">
    <div class="main-timer"></div>
    <h2 class="title">Выберите ${this.question.genre} треки</h2>
    <form class="genre">
      ${questionString}   
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </div>
</section>`;
  }

  bind() {
    this._removeTimer = initializeCountdown(this.element, this.state.time / 1000, gameSettings.time / 1000);
    const playerElementList = this.element.querySelectorAll(`.player-wrapper`);
    let index = 0;
    for (const playerElement of playerElementList) {
      this._removePlayer.push(initializePlayer(playerElement, this.question.songs[index].src));
      index++;
    }

    /**
     * Кнопка «Ответить» должна быть отключена, disabled, пока не выбран
     * ни один из возможных вариантов ответа.
     */
    const buttonGenreAnswerSend = this.element.querySelector(`button.genre-answer-send`);
    buttonGenreAnswerSend.disabled = true;

    const inputGenreAnswerList = this.element.querySelectorAll(`.genre-answer input`);
    for (const inputGenreAnswer of inputGenreAnswerList) {
      inputGenreAnswer.addEventListener(`change`, () => {
        buttonGenreAnswerSend.disabled = false;
      });
    }

    /**
     * Экран результатов .main--result должен показываться по нажатию
     * на кнопку «Ответить», блок .genre-answer-send.
     * Какой из последних экранов: экран поражения или экран результатов
     * показывать, определяйте случайным образом.
     */
    this.element.querySelector(`.genre-answer-send`).addEventListener(`click`, (event) => {
      event.preventDefault();
      this.onAnswer(this.getAnswer());
    });
  }

  unbind() {
    this._removeTimer();
    this._removePlayer.forEach((item) => {
      item();
    });
  }

  getAnswer() {
    const result = {type: `genre`, answer: []};
    if (document.getElementById(`a-1`).checked) {
      result.answer.push(1);
    }

    if (document.getElementById(`a-2`).checked) {
      result.answer.push(2);
    }

    if (document.getElementById(`a-3`).checked) {
      result.answer.push(3);
    }

    if (document.getElementById(`a-4`).checked) {
      result.answer.push(4);
    }
    return result;
  }

  onAnswer(result) {
    // Будет переопределен в классе контроллера
  }
}


