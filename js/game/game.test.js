import assert from 'assert';
import {checkLastLevel, checkTimeExpire, checkAnswer, calcStatistics} from './game';
import {initialState, questions} from '../data/game-data';
import statistics from '../data/game-statistics';

// const assert = chai.assert;
describe(`Guess Melody Game Logic`, () => {
  describe(`Last Level validator`, () => {
    it(`should not check initial state and states below 10 level`, () => {
      assert(!checkLastLevel(Object.assign({}, initialState)));
      assert(!checkLastLevel(Object.assign({}, initialState, {level: 1})));
      assert(!checkLastLevel(Object.assign({}, initialState, {level: 9})));
    });
    it(`should check states 10 level and above`, () => {
      assert(checkLastLevel(Object.assign({}, initialState, {level: 10})));
      assert(checkLastLevel(Object.assign({}, initialState, {level: 100})));
    });
  });

  describe(`Time Expire validator`, () => {
    it(`should not check initial state and states below 2 minites`, () => {
      assert(!checkTimeExpire(Object.assign({}, initialState)));
    });
    it(`should check states above 2 minutes`, () => {
      assert(checkTimeExpire(Object.assign({}, initialState, {time: 2 * 60 * 1000 + 1})));
    });
  });

  describe(`Answer validator`, () => {
    it(`should check right answers`, () => {
      assert(checkAnswer(Object.assign({}, questions[0]), {type: `artist`, answer: 2}));
      assert(checkAnswer(Object.assign({}, questions[1]), {type: `genre`, answer: [1, 4]}));
    });
    it(`should not check wrong answers`, () => {
      assert(!checkAnswer(Object.assign({}, questions[0]), {type: `artist`, answer: 3}));
      assert(!checkAnswer(Object.assign({}, questions[1]), {type: `genre`, answer: [2, 3]}));
    });
    it(`should not check partly right answers`, () => {
      assert(!checkAnswer(Object.assign({}, questions[1]), {type: `genre`, answer: [1, 2]}));
      assert(!checkAnswer(Object.assign({}, questions[1]), {type: `genre`, answer: [1]}));
    });
    it(`should deal with corner cases correctly`, () => {
      assert(!checkAnswer(Object.assign({}, questions[0]), {type: `artist`, answer: null}));
      assert(!checkAnswer(Object.assign({}, questions[1]), {type: `genre`, answer: []}));
      assert(!checkAnswer(Object.assign({}, questions[1]), {type: `genre`, answer: null}));
    });
  });
});

describe(`Guess Melody Game Statistics`, () => {
  describe(`Main statistic calculator`, () => {
    it(`should calc right answers`, () => {
     // assert.equal(calcStatistics({level: 10, lives: 1, time: 190000}, statistics), 0);
      assert.equal(calcStatistics({level: 10, lives: 3, time: 60000}, statistics), 60);
    });
    it(`should deal with corner cases correctly`, () => {

    });
  });
});


// 1. Игра состоит из 10 вопросов (уровней)
// checkLastLevel(state)
// getNextLevel(state)

// 2. На всю игру отводится две минуты
// checkTimeExpire(state)

// 3. Существуют два разных варианта вопроса:
// a)  Выбор исполнителя из трех предложенных
// b)  Выбор всех песен в названном жанре

// Пользователь может ответить на вопрос правильно либо неправильно. Частично правильный ответ считается неправильным.
// checkAnswer()

// После ответа на все вопросы, пользователь переходит на экран статистики.
// calcStatistics()

// Пользователю дается право на три ошибки (три жизни). В случае неправильного ответа,
// пользователь переходит к следующему вопросу и у него снимается одна жизнь.
// Если были израсходованы все три жизни, пользователь переходит к экрану статистики.

