import MovieListView from '../view/movie-list-view';
import MovieCardView from '../view/film-card-view';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import TopFilmsView from '../view/top-films-list-view';
import MostCommentedFilmsView from '../view/most-commented-films-view';
// import PopupView from '../view/popup-movie-details-view.js';
import {render} from '../render.js';

// const siteBodyNode = document.querySelector('body');
const siteMainNode = document.querySelector('.main');
const getFilmSection = () => siteMainNode.querySelector('.films');
const getFilmList = () => getFilmSection().querySelector('.films-list');


export default class ContentPresenter {

  init = (movieModel) => {
    this.movieModel = movieModel;
    this.newMovies = [...this.movieModel.getMovies()];

    render(new MovieListView(this.newMovies), siteMainNode);
    const getFilmCard = () => getFilmList().querySelector('.films-list__container');

    // Добавляет фильмы в список
    this.newMovies.forEach((el) => {
      render(new MovieCardView(el), getFilmCard());
    });
    render(new ButtonShowMoreView(), getFilmList());
    render(new TopFilmsView(), siteMainNode);
    render(new MostCommentedFilmsView(), siteMainNode);
    // console.log(siteMainNode);
    // render(new PopupView(), siteBodyNode);
  };
}


