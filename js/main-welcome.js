import getElementFromTemplate from './template-utils';
import mainLevelArtist from './main-level-artist';
import showWindow from './template-render';

const mainWelcome = getElementFromTemplate(`<!-- Приветствие -->
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
mainWelcome.querySelector(`.main-play`).addEventListener(`click`, () => showWindow(mainLevelArtist));

export default mainWelcome;
