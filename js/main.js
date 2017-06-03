/**
 * Клавиши управления экранами
 * @enum {number}
 */
const Keys = {
  'left': 37,
  'right': 39
};

/**
 * Массив DOM-элементов экранов приложения
 * @type {Array.<Object>}
 */
const windowArray = [];

/**
 * Контейнер основного окна в разметке
 * @type {Element}
 */
const mainSection = document.querySelector(`div.app section.main`);

/**
 * Шаблон с игровыми окнами
 * и не только
 * @type {Element}
 */
const template = document.querySelector(`#templates`);

/**
 * Список элементов с игровыми окнами
 * @type {NodeList}
 */
const windowList = template.content.querySelectorAll(`section.main`);

/**
 * Максимальный индекс окна
 * @type {number}
 */
const maxWindowIndex = windowList.length - 1;

/**
 * Индекс текущего окна
 * @type {number}
 */
let currentWindowIndex;

/**
 * Индекс стартевого окна
 * @type {number}
 */
let startWindowIndex;

for (let i = 0; i < windowList.length; i++) {
  windowArray[i] = windowList[i].cloneNode(true);
  if (windowArray[i].classList.contains(`main--welcome`)) {
    startWindowIndex = i;
  }
}

/**
 * Отображение игрового окна по индексу
 * @param {number} index
 */
const showWindow = (index) => {
  if (index === currentWindowIndex) {
    return;
  }
  const previousWindow = mainSection.querySelector(`section.main`);
  if (previousWindow) {
    mainSection.removeChild(previousWindow);
  }
  mainSection.appendChild(windowArray[index]);
  currentWindowIndex = index;
};

const onDocumentKeyDown = (event) => {
  if (!event.altKey) {
    return;
  }
  switch (event.keyCode) {
    case Keys.right:
      if (currentWindowIndex < maxWindowIndex) {
        showWindow(currentWindowIndex + 1);
      }
      break;
    case Keys.left:
      if (currentWindowIndex > 0) {
        showWindow(currentWindowIndex - 1);
      }
      break;
  }
};

document.addEventListener(`keydown`, onDocumentKeyDown);

showWindow(startWindowIndex);
