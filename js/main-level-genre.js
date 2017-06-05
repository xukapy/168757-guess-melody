import getElementFromTemplate from './template-utils';
import showWindow from './template-render';
import mainResultSuccess from './main-result-success';
import mainResultLoss from './main-result-loss';

const mainLevelGenre = getElementFromTemplate(`  <!-- Игра на выбор жанра -->
  <section class="main main--level main--level-genre">
    <h2 class="title">Выберите инди-рок треки</h2>
    <form class="genre">
      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-1">
        <label class="genre-answer-check" for="a-1"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-2">
        <label class="genre-answer-check" for="a-2"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-3">
        <label class="genre-answer-check" for="a-3"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-4">
        <label class="genre-answer-check" for="a-4"></label>
      </div>

      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </section>`);

/**
 * Кнопка «Ответить» должна быть отключена, disabled, пока не выбран
 * ни один из возможных вариантов ответа.
 */
const buttonGenreAnswerSend = mainLevelGenre.querySelector(`button.genre-answer-send`);
buttonGenreAnswerSend.disabled = true;

const inputGenreAnswerList = mainLevelGenre.querySelectorAll(`.genre-answer input`);
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
mainLevelGenre.querySelector(`.genre-answer-send`).addEventListener(`click`, (event) => {
  event.preventDefault();
  if (Math.round(Math.random()) === 0) {
    showWindow(mainResultLoss);
  } else {
    showWindow(mainResultSuccess);
  }
});

export default mainLevelGenre;
