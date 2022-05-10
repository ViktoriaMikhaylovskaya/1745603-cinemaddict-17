import MovieListView from '../view/movie-list-view';
import MovieCardView from '../view/film-card-view';
import ButtonShowMoreView from '../view/button-show-more-view';
import TopFilmsView from '../view/top-films-list-view';
import MostCommentedFilmsView from '../view/most-commented-films-view';
import PopupView from '../view/popup-movie-details-view';
import NoFilmView from '../view/no-film-view';
import {render} from '../render';

const siteBodyNode = document.querySelector('body');
const siteMainNode = document.querySelector('.main');
const getFilmSection = () => siteMainNode.querySelector('.films');
const getFilmList = () => getFilmSection().querySelector('.films-list');
const getFilmCard = () => getFilmList().querySelector('.films-list__container');

const FILM_COUNT_PER_STEP = 5;

export default class ContentPresenter {
  #movieModel = null;
  #newMovies = [];
  #showMoreButtonComponent = new ButtonShowMoreView();
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  init = (movieModel) => {
    this.#movieModel = movieModel;
    this.#newMovies = [...this.#movieModel.movies];

    render(new MovieListView(this.#newMovies), siteMainNode);

    if(this.#newMovies.length === 0) {
      render(new NoFilmView(), getFilmList());
    } else {

      for (let i = 0; i < Math.min(this.#newMovies.length, FILM_COUNT_PER_STEP); i++) {
        this.#renderMovie(this.#newMovies[i]);
      }

      // Добавит кнопку в конце списка фильмов
      if(this.#newMovies.length > FILM_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, getFilmList());

        this.#showMoreButtonComponent.element.addEventListener('click', this.#handleShowMoreButtonClick);
      }

      // Добавит популярные фильмы
      render(new TopFilmsView(), getFilmSection());
      const topFilmsNode = document.querySelector('.films-list__container--top-films');
      for (let i = 0; i < 2; i++) {
        render(new MovieCardView(this.#newMovies[i]), topFilmsNode);
      }

      // Добавит наиблее комментируемые фильмы
      render(new MostCommentedFilmsView(), getFilmSection());
      const mostCommentedFilmsNode = document.querySelector('.films-list__container--most-commented');
      for (let i = 0; i < 2; i++) {
        render(new MovieCardView(this.#newMovies[i]), mostCommentedFilmsNode);
      }
    }
  };

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#newMovies
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((movie) => this.#renderMovie(movie));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#newMovies.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderMovie = (movie) => {
    const movieComponent = new MovieCardView(movie);
    const popupComponent = new PopupView(movie);

    // TODO: убрать утечку памяти при нажатии на Esc - удалять обработчик события клика на кнопку закрытия.
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        siteBodyNode.removeChild(popupComponent.element);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const appendPopupToBody = () => {
      render(popupComponent, siteBodyNode);

      const closeButton = popupComponent.element.querySelector('.film-details__close-btn');

      function closePopup () {
        closeButton.removeEventListener('click', closePopup);
        document.removeEventListener('keydown', onEscKeyDown);
        siteBodyNode.removeChild(popupComponent.element);
      }

      closeButton.addEventListener('click', closePopup);

    };

    movieComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      appendPopupToBody();
      document.addEventListener('keydown', onEscKeyDown);
    });

    render(movieComponent, getFilmCard());
  };
}
