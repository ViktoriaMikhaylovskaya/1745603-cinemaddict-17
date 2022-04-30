import NewTaskListFilterView from './view/list-filter-view.js';
import NewUserNameView from './view/user-name-view.js';
import NewMovieCardView from './view/movie-card-view';
import NewButtonShowMore from './view/button-show-more-view.js';
import NewPopupMovieDetailsView from './view/popup-movie-details-view';
import {render} from './render.js';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
// const siteFilmsSectionElement = siteMainElement.querySelector('.films');
// const siteFilmListElement = siteFilmsSectionElement.querySelector('.films-list');

render(new NewUserNameView(), siteHeaderElement);
render(new NewTaskListFilterView(), siteMainElement);
render(new NewMovieCardView(), siteMainElement);

render(new NewButtonShowMore(), siteMainElement);
render(new NewPopupMovieDetailsView(), siteBodyElement);
