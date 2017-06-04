/**
 * Контейнер основного окна в разметке
 * @type {Element}
 */
const mainSection = document.querySelector(`div.app > section.main`);

/**
 * Отображение игрового окна по шаблону
 * @param {Element} templateElement
 */
const showWindow = (templateElement) => {
  const previousWindow = mainSection.firstChild;
  if (previousWindow) {
    mainSection.removeChild(previousWindow);
  }
  mainSection.appendChild(templateElement);
};

export default showWindow;
