import MovieListView from '../view/movie-list-view';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import TopFilmsView from '../view/top-films-list-view';
import MostCommentedFilmsView from '../view/most-commented-films-view';
import {render} from '../render.js';

const siteMainNode = document.querySelector('.main');
const getFilmSection = () => siteMainNode.querySelector('.films');
const getFilmList = () => getFilmSection().querySelector('.films-list');


export default class ContentPresenter {

  init = (movieModel) => {
    this.movieModel = movieModel;
    this.newMovies = [...this.movieModel.getMovies()];

    render(new MovieListView(), siteMainNode);
    for (let i = 0; i < this.newMovies.length; i++) {
      render(new MovieListView(this.newMovies[i]), getFilmList());
    }

    render(new ButtonShowMoreView(), getFilmList());
    render(new TopFilmsView(), getFilmSection());
    render(new MostCommentedFilmsView(), getFilmSection());
  };
}


