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

const mainSection = document.querySelector(`div.app section.main`);
const template = document.querySelector(`#templates`);
const windowList = template.content.querySelectorAll(`section.main`);
const maxWindowIndex = windowList.length;
let currentWindowIndex;

for (let i = 0; i < windowList.length; i++) {
  windowArray[i] = windowList[i].cloneNode(true);
  if (windowArray[i].classList.contains(`main--welcome`)) {
    currentWindowIndex = i;
  }
}

const showWindow = (index) => {
  const previousWindow = mainSection.querySelector(`section.main`);
  if (previousWindow) {
    mainSection.removeChild(previousWindow);
  }
  mainSection.appendChild(windowArray[index]);
  currentWindowIndex = index;
};

const onDocumentKeyDown = (event) => {
  switch (event.keyCode) {
    case Keys.right:
      if (currentWindowIndex < maxWindowIndex - 1) {
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

showWindow(currentWindowIndex);
