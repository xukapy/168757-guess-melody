import changeView from '../../template-render';
import ResultLossView from './result-loss-view';
import welcome from '../welcome/welcome';


export default () => {
  const resultLoss = new ResultLossView();

  resultLoss.onClick = () => {
    changeView(welcome().element);
  };

  return resultLoss;
};
