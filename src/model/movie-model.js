import {createMockArray} from '../mock/create-mock-object.js';


export default class MovieModel {
  #movies = [];

  constructor() {
    this.#movies = createMockArray(17);
  }

  get movies () {
    return this.#movies;
  }
}
