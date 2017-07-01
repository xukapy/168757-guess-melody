const initialState = Object.freeze({
  level: 0,  // начальный уровень
  lives: 3,  // кол-во допустимых ошибок
  time: 0   // милисекунд
});

const questions = Object.freeze([
  {
    type: `artist`,
    song: {src: `./audio/krasnoznamennaya_diviziya_imeni_moei_babushki_vesna_v_toronto.mp3`, artist: `Краснознаменная дивизия моей бабушки`},
    answer: 2,
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
