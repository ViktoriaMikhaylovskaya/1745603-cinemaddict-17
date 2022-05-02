import {createMockArray} from '../mock/create-mock-object.js';

export default class MovieModel {
  constructor() {
    this.movies = createMockArray(4);
  }

  getMovies = () => this.movies;
}


