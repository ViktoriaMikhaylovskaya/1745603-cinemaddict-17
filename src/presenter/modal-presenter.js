import {render, replace} from '../framework/render';
import PopupView from '../view/popup-view';
import {humanizeFilmDueDate} from '../util.js';
import {nanoid} from 'nanoid';
import { UpdateType, UserAction } from '../const.js';

export default class ModalPresenter {
  #movie = null;
  #root = null;
  #popupComponent = null;
  #changeData = () => null;
  #closeModal = () => null;
  #commentsModel = null;

  constructor({rootNode = document.body, closeModal, onChange, commentsModel} = {}) {
    this.#root = rootNode;
    this.#closeModal = closeModal;
    this.#changeData = onChange;
    this.#commentsModel = commentsModel;

    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  init = (movie) => {
    this.#movie = movie;

    const prevPopupComponent = this.#popupComponent;

    this.#popupComponent = new PopupView({
      commmentsModel: this.#commentsModel,
      handleModelEvent: this.#handleModelEvent,
      movie,
      onSubmit: ({chooseEmotion, typedComment}) => {
        if(typeof chooseEmotion === 'string' && chooseEmotion !== '' && typeof typedComment === 'string' && typedComment !== '') {
          this.#changeData(
            UserAction.ADD_COMMENT,
            UpdateType.MINOR,
            {
              id: nanoid(),
              commenter: 'Ilya OReilly',
              comment: typedComment,
              dateComment: humanizeFilmDueDate(new Date ().toISOString()),
              emotion: chooseEmotion
            }
          );
        }
      }});

    this.#popupComponent.setWatchlistClickHandler(this.#handleWatchListClick);
    this.#popupComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPopupComponent === null) {
      render(this.#popupComponent, this.#root);
    } else {
      replace(this.#popupComponent, prevPopupComponent);
    }
    this.#popupComponent.addEvents(this.#closeModal);
  };

  #handleDeleteClick = (comment) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.MINOR,
      comment,
    );
  };

  #handleModelEvent = (event, payload) => {
    switch (event) {
      case UpdateType.PATCH:
        this.init(payload);
        break;
      case UpdateType.MINOR:
        this.init(payload);
        break;
    }
  };

  #handleWatchListClick = () => {
    this.#movie.filmInfo.userDetails.watchlist = !this.#movie.filmInfo.userDetails.watchlist;
    this.#changeData(this.#movie);
  };

  #handleWatchedClick = () => {
    this.#movie.filmInfo.userDetails.alreadyWatched = !this.#movie.filmInfo.userDetails.alreadyWatched;
    this.#changeData(this.#movie);
  };

  #handleFavoriteClick = () => {
    this.#movie.filmInfo.userDetails.favorite = !this.#movie.filmInfo.userDetails.favorite;
    this.#changeData(
      UserAction.UPDATE_MODAL,
      {
        ...this.#movie,
        userDetails: {
          ...this.#movie.userDetails,
          favorite: this.#movie.filmInfo.userDetails.favorite
        }
      }
    );
  };
}
