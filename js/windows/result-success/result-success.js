import changeView from '../../template-render';
import ResultSuccessView from './result-success-view';
import welcome from '../welcome/welcome';


export default () => {
  const resultSuccess = new ResultSuccessView();

  resultSuccess.onClick = () => {
    changeView(welcome().element);
  };

  return resultSuccess;
};

