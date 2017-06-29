const initialState = Object.freeze({
  level: 0,  // начальный уровень
  lives: 3,  // кол-во допустимых ошибок
  time: 0   // милисекунд
});

const questions = Object.freeze([
  {
    type: `artist`,
    song: {src: ``, artist: `Пелагея`},
    answer: 1,
    artists: [`Пелагея`, `Краснознаменная дивизия моей бабушки`, `Lorde`]
  },
  {
    type: `genre`,
    genre: `инди-рок`,
    answer: [1, 4],
    songs: [{src: ``, genre: `инди-рок`},
      {src: ``, genre: `панк`},
      {src: ``, genre: `классика`},
      {src: ``, genre: `инди-рок`}]
  }
]);

export {initialState, questions};
