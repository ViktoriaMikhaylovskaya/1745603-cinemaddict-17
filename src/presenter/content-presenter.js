import {render, remove} from '../framework/render';
import SortView from '../view/list-sort-view';
import MovieListView from '../view/movie-list-view';
import MovieCardView from '../view/film-card-view';
import ButtonShowMoreView from '../view/button-show-more-view';
import TopFilmsView from '../view/top-films-list-view';
import MostCommentedFilmsView from '../view/most-commented-films-view';
import NoFilmView from '../view/no-film-view';
import FilmPresenter from './film-presenter';
import ModalPresenter from './modal-presenter';
import {SortType} from '../view/list-sort-view';

const siteMainNode = document.querySelector('.main');
const getFilmSection = () => siteMainNode.querySelector('.films');
const getFilmList = () => getFilmSection().querySelector('.films-list');
const getFilmCard = () => getFilmList().querySelector('.films-list__container');

const FILM_COUNT_PER_STEP = 5;
const MAX_COUNT_FILMS_IN_LIST = 2;

export default class ContentPresenter {
  #movieModel = null;
  #isModalOpen = false;
  #currentSortType = SortType.DEFAULT;
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #showMoreButtonComponent = new ButtonShowMoreView();
  #sortComponent = new SortView(this.#currentSortType);
  #modalPresenter = null;

  #filmPresenter = new Map();

  constructor(movieModel) {
    this.#movieModel = movieModel;
  }

  get movies() {
    switch (this.#currentSortType) {
      case SortType.SORT_BY_RATING:
        return [...this.#movieModel.movies].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
      case SortType.SORT_BY_DATE:
        return [...this.#movieModel.movies].sort((a, b) => a.filmInfo.totalRating - b.filmInfo.totalRating);
    }

    return this.#movieModel.movies;
  }

  init = () => {
    this.#renderSort();
    this.#renderBoard();
  };

  #closeModal = () => {
    this.#isModalOpen = false;
    const root = document.querySelector('.film-details');
    document.body.removeChild(root);
    document.body.classList.remove('hide-overflow');
  };

  #openModal = (movie) => {
    this.#isModalOpen = true;
    this.#modalPresenter = new ModalPresenter({
      closeModal: this.#closeModal,
      onChange: this.#handleFilmChange
    });
    this.#modalPresenter.init(movie);
    document.body.classList.add('hide-overflow');
  };

  #handleShowMoreButtonClick = () => {
    const Allmovies = [...this.#movieModel.movies];
    const movieCount = Allmovies.length;
    const newRenderedMoviesCount =  Math.min(movieCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    const movies = Allmovies.slice(this.#renderedFilmCount, newRenderedMoviesCount);

    this.#renderMovies(movies);
    this.#renderedFilmCount = newRenderedMoviesCount;

    if (this.#renderedFilmCount >= movieCount) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handleFilmChange = (updatedFilm) => {
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
    if (this.#isModalOpen) {
      this.#modalPresenter.init(updatedFilm);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmList();
    this.#renderBoard();

  };

  #renderSort = () => {
    render(this.#sortComponent, siteMainNode);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderMovies = (movies) => {
    movies.forEach((movie) => this.#renderMovie(movie));
  };

  #renderMovie = (movie) => {
    const filmPresenter = new FilmPresenter({
      rootNode: getFilmCard(),
      onChange: this.#handleFilmChange,
      openModal: this.#openModal,
      closeModal: this.#closeModal
    });
    filmPresenter.init(movie);
    this.#filmPresenter.set(movie.id, filmPresenter);
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #renderBoard = () => {
    this.#renderMovieList();
    this.#renderTopFilms();
    this.#renderMostCommendetFilms();
  };

  #renderMovieList =() => {
    const movies = [...this.#movieModel.movies];
    const moviesCount = movies.length;

    render(new MovieListView(movies), siteMainNode);

    if(moviesCount === 0) {
      render(new NoFilmView(), getFilmList());
    } else {

      for (let i = 0; i < Math.min(moviesCount, FILM_COUNT_PER_STEP); i++) {
        this.#renderMovie(movies[i]);
      }

      // Добавит кнопку в конце списка фильмов
      if(moviesCount > FILM_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, getFilmList());

        this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
      }
    }
  };

  #renderTopFilms = () => {
    render(new TopFilmsView(), getFilmSection());
    const topFilmsNode = document.querySelector('.films-list__container--top-films');
    const movies = [...this.#movieModel.movies];
    for (let i = 0; i < MAX_COUNT_FILMS_IN_LIST; i++) {
      render(new MovieCardView(movies[i]), topFilmsNode);
    }
  };

  #renderMostCommendetFilms = () => {
    render(new MostCommentedFilmsView(), getFilmSection());
    const mostCommentedFilmsNode = document.querySelector('.films-list__container--most-commented');
    const movies = [...this.#movieModel.movies];
    for (let i = 0; i < MAX_COUNT_FILMS_IN_LIST; i++) {
      render(new MovieCardView(movies[i]), mostCommentedFilmsNode);
    }
  };
}
