// import NewTaskListFilterView from './view/list-filter-view.js';
import NewUserNameView from './view/user-name-view.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');
// const siteMainElement = document.querySelector('.main');

render(new NewUserNameView(), siteHeaderElement);
// render(new NewTaskListFilterView(), siteMainElement);
