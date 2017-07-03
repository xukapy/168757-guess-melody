import gameSettings from '../data/game-settings';


const checkLastLevel = (state) => {
  return state.level >= gameSettings.maxlevel;
};

const checkTimeExpire = (state) => {
  return state.time > gameSettings.time;
};

const checkAnswer = (question, answer) => {

  if (question.type !== answer.type) {
    throw new Error(`Ответ не соответствует вопросу`);
  }

  if (question.type === `artist`) {
    return question.answer === answer.answer;
  } else if (question.type === `genre`) {
    /**
     * Массив ответов
     * @type {Array}
     */
    /*
    const result = [];
    question.songs.forEach((item, index) => {
      if (item.genre === question.genre) {
        result.push(index);
      }
    });
    if (!answer.songs) {
      return false;
    }
    */
    /**
     * Если количество ответов не совпадает - ошибка
     */
    if (!answer.answer) {
      return false;
    }

    if (question.answer.length !== answer.answer.length) {
      return false;
    }
    /**
     * Если хотя бы один элемент не совпадает - ошибка
     */
    for (let i = 0; i < question.answer.length; i++) {
      if (question.answer[i] !== answer.answer[i]) {
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

const nextLevel = (state) => {
  return Object.assign({}, state, {level: state.level + 1});
};

const minusLives = (state) => {
  return Object.assign({}, state, {lives: state.lives - 1});
};

const preprocessQuestions = (json) => {
  return json.map((question) => {
    let preQuestion;
    if (question.type === `artist`) {
      let lanswer;
      const lartists = [];
      question.answers.forEach((item, i) => {
        lartists.push(item.title);
        if (item.isCorrect) {
          lanswer = i + 1;
        }
      });
      preQuestion = Object.assign({type: `artist`}, {song: {src: question.src}}, {answer: lanswer, artists: lartists});
    } else {
      const lanswers = [];
      question.answers.forEach((item, i) => {
        if (item.genre === question.genre) {
          lanswers.push(i + 1);
        }
      });
      preQuestion = {type: `genre`, genre: question.genre, songs: question.answers, answer: lanswers};
    }

    return preQuestion;
  });
};

export {checkLastLevel, checkTimeExpire, checkAnswer, calcStatistics, nextLevel, minusLives, preprocessQuestions};
