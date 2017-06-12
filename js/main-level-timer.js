import getElementFromTemplate from './template-utils';
import timeFormat from './time-format';
const totalTime = 120000; // 2 минуты
const mainLevelTimer = (time) => {
  const timeLeft = timeFormat(totalTime, time);
  return getElementFromTemplate(`
<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
cx="390" cy="390" r="370"
class="timer-line"
style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

  <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
  <span class="timer-value-mins">${timeLeft.minutes}</span><!--
  --><span class="timer-value-dots">:</span><!--
  --><span class="timer-value-secs">${timeLeft.seconds}</span>
  </div> 
</svg>`);
};

export default mainLevelTimer;
