import changeView from '../../template-render';
import ResultLossView from './result-loss-view';
import welcome from '../welcome/welcome';

const resultLoss = new ResultLossView();

resultLoss.onClick = () => {
  changeView(welcome().element);
};

export default () => resultLoss;
