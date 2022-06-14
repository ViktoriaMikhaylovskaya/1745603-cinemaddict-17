import {createMockArray} from '../mock/create-mock-object.js';
import Observable from '../framework/observable.js';


export default class MovieModel extends Observable {
  #movies = [];

  constructor() {
    super();
    this.#movies = createMockArray(22);
  }

  get movies () {
    return this.#movies;
  }
}
