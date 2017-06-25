import getElementFromTemplate from './template-utils';

export default class AbstractView {
  get template() {
    throw new Error(`You have to implement template`);
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {
  }

  getMarkup() {
    this._element = this.render();
    this.bind();
  }
  /**
   * Getter
   * @return {Element}
   */
  get element() {
    if (!this._element) {
      this.getMarkup();
    }
    return this._element;
  }
}
