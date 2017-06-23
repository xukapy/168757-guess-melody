import changeView from '../../template-render';
import WelcomeView from './welcome-view';
import {initialState} from '../../data/game-data';
import levelArtist from '../level-artist/level-artist';

const welcome = new WelcomeView();

welcome.onStart = () => {
  changeView(levelArtist(initialState).element);
};

export default () => welcome;
