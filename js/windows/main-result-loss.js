import getElementFromTemplate from '../template-utils';
import showWindow from '../template-render';
import mainWelcome from './main-welcome';

const mainResultLoss = () => {
  const element = getElementFromTemplate(`  <!-- Неудачный результат игры -->
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы проиграли</h2>
    <div class="main-stat">Ничего, вам повезет в следующий раз</div>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`);

  /**
   * Кнопка «Сыграть еще раз» на последнем экране (экран результатов или экран поражения)
   * должна открывать первый экран.
   */
  element.querySelector(`.main-replay`).addEventListener(`click`, () => showWindow(mainWelcome()));
  return element;
};

export default mainResultLoss;
