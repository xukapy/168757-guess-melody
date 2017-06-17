import gameSettings from '../data/game-settings';

const checkLastLevel = (state) => {
  return state.level >= gameSettings.maxlevel;
};

const checkTimeExpire = (state) => {
  return state.time > gameSettings.time;
};

const checkAnswer = (question, answer) => {
  if (question.type === `artist`) {
    return question.song.artist === answer.artist;
  } else if (question.type === `genre`) {
    /**
     * Массив ответов
     * @type {Array}
     */
    const result = [];
    question.songs.forEach((item, index) => {
      if (item.genre === question.genre) {
        result.push(index);
      }
    });
    if (!answer.songs) {
      return false;
    }
    /**
     * Если количество ответов не совпадает - ошибка
     */
    if (result.length !== answer.songs.length) {
      return false;
    }
    /**
     * Если хотя бы один элемент не совпадает - ошибка
     */
    for (let i = 0; i < result.length; i++) {
      if (result[i] !== answer.songs[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
};


const calcStatistics = (state, statistics) => {
  /**
   * ( Количество результатов хуже нашего / Общее количество + 1 ) * 100;
   */
  const gameStat = {
    time: state.time,
    answers: gameSettings.maxlevel - (gameSettings.lives - state.lives)
  };
  const losers = statistics.filter((stat) => {
    if (stat.answers < gameStat.answers) {
      return true;
    }
    if (stat.answers === gameStat.answers && stat.time < gameStat.time) {
      return true;
    }
    return false;
  });
  return (losers.length / (statistics.length + 1)) * 100;
};

export {checkLastLevel, checkTimeExpire, checkAnswer, calcStatistics};
