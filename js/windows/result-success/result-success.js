import changeView from '../../template-render';
import ResultSuccessView from './result-success-view';
import welcome from '../welcome/welcome';

const resultSuccess = new ResultSuccessView();

resultSuccess.onClick = () => {
  changeView(welcome().element);
};

export default () => resultSuccess;
