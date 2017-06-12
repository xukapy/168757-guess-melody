const initialState = Object.freeze({
  level: 0,  // начальный уровень
  lives: 3,  // кол-во допустимых ошибок
  time: 35000   // милисекунд
});

const questions = Object.freeze([
  {
    type: `artist`,
    song: {src: ``, artist: `Пелагея`},
    artists: [`Пелагея`, `Краснознаменная дивизия моей бабушки`, `Lorde`]
  },
  {
    type: `gendre`,
    genre: `инди-рок`,
    songs: [{src: ``, genre: `инди-рок`},
      {src: ``, genre: `панк`},
      {src: ``, genre: `классика`},
      {src: ``, genre: `инди-рок`}]
  }
]);

export {initialState, questions};
