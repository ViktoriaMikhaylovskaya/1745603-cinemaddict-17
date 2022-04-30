import NewMovieListView from '../view/movie-list-view';
import NewButtonShowMoreView from '../view/button-show-more-view.js';
import NewFilmListExtraView from '../view/top-films-list-view';
import NewTopCommentedFilmsView from '../view/most-commented-films-view';
import NewStatisticsView from '../view/statistics-view';
import NewPopupMovieDetailsView from '../view/popup-movie-details-view';
import {render} from '../render.js';

const siteBodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const getFilmSection = () => siteMainElement.querySelector('.films');
const getFilmList = () => getFilmSection().querySelector('.films-list');
const siteFooterElement = document.querySelector('.footer__statistics');


export default class ContentPresenter {

  init = () => {
    render(new NewMovieListView(), siteMainElement);
    render(new NewButtonShowMoreView(), getFilmList());
    render(new NewFilmListExtraView(), getFilmSection());
    render(new NewTopCommentedFilmsView(), getFilmSection());
    render(new NewStatisticsView(), siteFooterElement);
    render(new NewPopupMovieDetailsView(), siteBodyElement);
  };
}
