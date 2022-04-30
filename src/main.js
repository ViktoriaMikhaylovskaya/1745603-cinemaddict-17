import NewListFilterView from './view/list-filter-view.js';
import NewUserNameView from './view/user-name-view.js';
import NewNavigationView from './view/navigation-view';
import {render} from './render.js';
import ContentPresenter from './presenter/content-presenter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const contentPresenter = new ContentPresenter();

render(new NewUserNameView(), siteHeaderElement);
render(new NewNavigationView(), siteMainElement);
render(new NewListFilterView(), siteMainElement);

contentPresenter.init(siteMainElement);
