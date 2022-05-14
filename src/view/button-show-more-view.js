import AbstractView from '../framework/view/abstract-view.js';

const createNewButtonShowMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class ButtonShowMoreView extends AbstractView {
  get template() {
    return createNewButtonShowMoreTemplate();
  }
}
