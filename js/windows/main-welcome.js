import getElementFromTemplate from '../template-utils';
import mainLevelArtist from './main-level-artist';
import mainLevelGenre from './main-level-genre';
import showWindow from '../template-render';
import {initialState, questions} from '../data/game-data';

const mainWelcome = () => {
  const element = getElementFromTemplate(`<!-- Приветствие -->
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;2 минуты дать
      максимальное количество правильных ответов.<br>
      Удачи!
    </p>
  </section>`);

  /**
   * Экран первой игры .main--level-artist должен показываться по нажатию
   * на кнопку Play — блок .main-play на главном экране.
   */
  element.querySelector(`.main-play`).addEventListener(`click`, () => {
    let firstWindow;
    if (questions[0].type === `artist`) {
      firstWindow = mainLevelArtist(initialState, questions);
    } else {
      firstWindow = mainLevelGenre(initialState, questions);
    }
    showWindow(firstWindow);
  });
  return element;
};

export default mainWelcome;
