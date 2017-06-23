import LevelGenreView from './level-genre-view';
import resultSuccess from '../result-success/result-success';
import resultLoss from '../result-loss/result-loss';
import changeView from '../../template-render';
import {questions} from '../../data/game-data';

export default (state) => {
  const question = questions[state.level];
  const levelGenre = new LevelGenreView(state, question);

  /**
   * Экран второй игры .main--level-genre должен показываться по нажатию
   * на любой из вариантов ответа — блок .main-answer на первом игровом экране.
   */
  levelGenre.onAnswer = () => {
    if (Math.round(Math.random()) === 0) {
      changeView(resultLoss().element);
    } else {
      changeView(resultSuccess().element);
    }
  };
  return levelGenre;
};

