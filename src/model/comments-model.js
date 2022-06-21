import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import {convertSnakeCaseKeysToCamelCase} from '../utils.js';

export default class CommentsModel extends Observable {
  #film = null;
  #moviesApiService= null;
  #comments = [];

  constructor(moviesApiService) {
    super();
    this.#moviesApiService = moviesApiService;
  }

  get comments() {
    return this.#comments;

  }

  init = async (film) => {
    this.#film = film;
    try {
      this.#comments = await this.#moviesApiService.getComments(film);
    } catch (err) {
      this.#comments = [];
      throw new Error(err);
    }
    this._notify(UpdateType.INIT_COMMENTS, this.#film);
  };

  addComment = async (event, payload) => {
    try {
      const response = await this.#moviesApiService.addComment(this.#film, payload);
      this.#comments = this.#adaptToClient(response);
      this.#film.comments.push(payload.id);
      this._notify(event, this.#film);
    } catch(err) {
      throw new Error(err);
    }
  };

  deleteComment = (updateType, commentID) => {
    this.#comments = this.#comments.filter(( _ , index) => index !== commentID);

    this._notify(updateType, this.#film);
  };

  #adaptToClient = (film,) => {
    const {id, filmInfo, userDetails, comments} = convertSnakeCaseKeysToCamelCase(film.movie);
    filmInfo.userDetails = userDetails;

    const adaptedComments = convertSnakeCaseKeysToCamelCase(film.comments);
    return {id, filmInfo, comments}, adaptedComments;
  };
}
