import getElementFromTemplate from './template-utils';
import showWindow from './template-render';
import mainLevelGenre from './main-level-genre';
import mainLevelTimer from './main-level-timer';

const mainLevelArtist = (state, questions) => {
  const question = questions[state.level];
  const mainLevelArtistElement = getElementFromTemplate(`  <!-- Выбор исполнителя: уровень -->
  <section class="main main--level main--level-artist"></section>`);
  const sectionElement = mainLevelArtistElement.querySelector(`section.main`);
  sectionElement.appendChild(mainLevelTimer(state.time));

  const questionElement = question.artists.map((artist, index) => `        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="val-${index + 1}" />
          <label class="main-answer" for="answer-${index + 1}">
            <img class="main-answer-preview" src="">
            ${artist}
          </label>
        </div>`).join(``);


  sectionElement.appendChild(getElementFromTemplate(`
    <div class="main-wrap">
      <div class="main-timer"></div>

      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper"></div>
      <form class="main-list">
      ${questionElement}
      </form>
    </div>`));

/**
 * Экран второй игры .main--level-genre должен показываться по нажатию
 * на любой из вариантов ответа — блок .main-answer на первом игровом экране.
 */
  const inputAnswerList = mainLevelArtistElement.querySelectorAll(`.main-answer-wrapper`);
  for (const inputAnswer of inputAnswerList) {
    inputAnswer.addEventListener(`click`, () => showWindow(
        mainLevelGenre(
            Object.assign({}, state, {'level': 1})
          , questions
                      )
    ));
  }

  return mainLevelArtistElement;
};

export default mainLevelArtist;

