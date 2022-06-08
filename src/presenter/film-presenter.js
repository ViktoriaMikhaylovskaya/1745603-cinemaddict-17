import {render, replace, remove} from '../framework/render';
import MovieCardView from '../view/film-card-view';
import PopupView from '../view/popup-movie-details-view';

import {humanizeFilmDueDate} from '../util.js';
import {nanoid} from 'nanoid';
import { dateComment} from '../mock/data';

const siteBodyNode = document.querySelector('body');

const Mode = {
  DEFAULT: 'CARD',
  EDITING: 'POPUP',
};


export default class FilmPresenter {
  #filmListContainer = null;
  #changeData = null;
  #changeMode = null;

  #movieComponent = null;
  #popupComponent = null;

  #movie = null;
  #mode = Mode.DEFAULT;

  constructor(filmListContainer, changeData, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;

    this.cleanUp = () => {
      const root = this.#popupComponent.element;
      const onEscKeyDown = this.#onEscKeyDown;
      const closeButton = root.querySelector('.film-details__close-btn');
      const closeOverlayNode = root.querySelector('.films-details__shadow');

      closeButton.removeEventListener('click', this.cleanUp);
      closeOverlayNode.removeEventListener('click', this.cleanUp);
      document.removeEventListener('keydown', onEscKeyDown);
      siteBodyNode.removeChild(root);
      document.body.classList.remove('hide-overflow');
      // this.#popupComponent.reset(this.#movie);
      // this.#mode = Mode.DEFAULT;
    };
  }

  init = (movie) => {
    this.#movie = movie;

    const prevFilmComponent = this.#movieComponent;
    // const prevPopupComponent = this.#popupComponent;

    this.#movieComponent = new MovieCardView(movie);
    this.#popupComponent = new PopupView(movie);

    this.#movieComponent.setFilmClickHandler(() => {
      this.#appendPopupToBody();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#movieComponent.setWatchlistClickHandler(this.#handleWatchListClick);
    this.#movieComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#movieComponent.setFavoriteClickHandler(this.#handleFavoriteClick);


    if (prevFilmComponent === null) {
      render(this.#movieComponent, this.#filmListContainer);
    } else {
      replace(this.#movieComponent, prevFilmComponent);
      this.#popupComponent.reset(this.#movie);
    }
  };

  destroy = () => {
    remove(this.#movieComponent);
    remove(this.#popupComponent);
  };

  resetView = () => {
    this.#popupComponent.reset(this.#movie);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#popupComponent.reset(this.#movie);
      siteBodyNode.removeChild(this.#popupComponent.element);
      document.removeEventListener('keydown', this.#onEscKeyDown);
      document.body.classList.remove('hide-overflow');
    }
  };

  #addCommenttoPopup = (evt) => {
    if (evt.ctrlKey && evt.keyCode === 13) {
      if(evt.target.value !== '') {
        this.#movie.comments = [...this.#movie.comments,
          {
            id: nanoid(),
            commenter: 'Ilya OReilly',
            comment: evt.target.value,
            dateComment: humanizeFilmDueDate(dateComment),
            emotion: evt.target.value
          }];
        this.#changeData(this.#movie);
      }
    }
  };

  #appendPopupToBody = () => {
    render(this.#popupComponent, siteBodyNode);
    document.body.classList.add('hide-overflow');

    const root = this.#popupComponent.element;
    const closeButtonNode = root.querySelector('.film-details__close-btn');
    const closeOverlayNode = root.querySelector('.films-details__shadow');

    closeButtonNode.addEventListener('click', this.cleanUp);
    closeOverlayNode.addEventListener('click', this.cleanUp);
    document.addEventListener('keydown', this.#addCommenttoPopup);

    this.#changeMode();

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
    this.#changeData(this.#movie);
  };

  // #handleDeleteClick = () => {
  //   const commentList = document.querySelector('.film-details__comments-list');
  //   const comment = commentList.querySelector('.film-details__comment');
  // };
}
