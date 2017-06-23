import LevelArtistView from './level-artist-view';
import levelGenre from '../level-genre/level-genre';
import changeView from '../../template-render';
import {questions} from '../../data/game-data';

export default (state) => {
  const question = questions[state.level];
  const levelArtist = new LevelArtistView(state, question);

  /**
   * Экран второй игры .main--level-genre должен показываться по нажатию
   * на любой из вариантов ответа — блок .main-answer на первом игровом экране.
   */
  levelArtist.onAnswer = () => {
    const newState = Object.assign({}, state, {'level': state.level + 1});
    changeView(levelGenre(newState).element);
  };
  return levelArtist;
};


