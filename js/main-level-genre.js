import getElementFromTemplate from './template-utils';
import showWindow from './template-render';
import mainResultSuccess from './main-result-success';
import mainResultLoss from './main-result-loss';
import mainLevelTimer from './main-level-timer';

const mainLevelGenre = (state, questions) => {
  const question = questions[state.level];
  const mainLevelGenreElement =
  getElementFromTemplate(`  <!-- Игра на выбор жанра -->
  <section class="main main--level main--level-genre"></section>`);
  const sectionElement = mainLevelGenreElement.querySelector(`section.main`);
  sectionElement.appendChild(mainLevelTimer(state.time));

  const questionElement = question.songs.map((artist, index) => `      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-${index + 1}" id="a-${index + 1}">
        <label class="genre-answer-check" for="a-${index + 1}"></label>
      </div>`).join(``);
  /**
   * Создаем элемент игрового окна с жанрами
   */
  sectionElement.appendChild(getElementFromTemplate(`
    <div class="main-wrap">
    <div class="main-timer"></div>
    <h2 class="title">Выберите ${question.genre} треки</h2>
    <form class="genre">
      ${questionElement}   
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </div>`));

  /**
   * Кнопка «Ответить» должна быть отключена, disabled, пока не выбран
   * ни один из возможных вариантов ответа.
   */
  const buttonGenreAnswerSend = mainLevelGenreElement.querySelector(`button.genre-answer-send`);
  buttonGenreAnswerSend.disabled = true;

  const inputGenreAnswerList = mainLevelGenreElement.querySelectorAll(`.genre-answer input`);
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
  mainLevelGenreElement.querySelector(`.genre-answer-send`).addEventListener(`click`, (event) => {
    event.preventDefault();
    if (Math.round(Math.random()) === 0) {
      showWindow(mainResultLoss);
    } else {
      showWindow(mainResultSuccess);
    }
  });
  return mainLevelGenreElement;
};

export default mainLevelGenre;
