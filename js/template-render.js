/**
 * Контейнер основного окна в разметке
 * @type {Element}
 */
const mainSection = document.querySelector(`div.app > section.main`);

/**
 * Отображение игрового окна по шаблону
 * @param {Object} view
 */
const showWindow = (view) => {
/*
  const previousWindow = mainSection.firstChild;
  if (previousWindow) {
    mainSection.removeChild(previousWindow);
  }
*/
  mainSection.innerHTML = ``;
  mainSection.appendChild(view.element);
};

export default showWindow;
