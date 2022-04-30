import NewMovieListView from '../view/movie-list-view';
import NewButtonShowMore from '../view/button-show-more-view.js';
import NewPopupMovieDetailsView from '../view/popup-movie-details-view';
import {render} from '../render.js';

const siteBodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const getFilmSection = () => siteMainElement.querySelector('.films');
const getFilmList = () => getFilmSection().querySelector('.films-list');


export default class ContentPresenter {

  init = () => {
    render(new NewMovieListView(), siteMainElement);
    render(new NewButtonShowMore(), getFilmList());
    render(new NewPopupMovieDetailsView(), siteBodyElement);
  };
}
