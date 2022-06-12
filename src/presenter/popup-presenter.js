// import {render, replace, remove} from '../framework/render';
// import PopupView from '../view/popup-movie-details-view';

// export default class PopupPresenter {
//   #movieComponent = null;
//   #movie = null;

//   constructor(movieComponent) {
//     this.movieComponent = movieComponent;
//     // console.log(this.movieComponent);
//   }

//   init = (movie) => {
//     this.#movie = movie;
//     console.log(this.#movie);
//   };

//   // #filmListContainer = null;
//   // #changeData = null;
//   // #changeMode = null;

//   // #movieComponent = null;
//   // #popupComponent = null;

//   // #movie = null;

//   // constructor(filmListContainer, changeData, changeMode) {
//   //   this.#filmListContainer = filmListContainer;
//   //   this.#changeData = changeData;
//   //   this.#changeMode = changeMode;

//   //   this.cleanUp = () => {
//   //     const root = this.#popupComponent.element;
//   //     const onEscKeyDown = this.#onEscKeyDown;
//   //     const closeButton = root.querySelector('.film-details__close-btn');
//   //     const closeOverlayNode = root.querySelector('.films-details__shadow');

//   //     closeButton.removeEventListener('click', this.cleanUp);
//   //     closeOverlayNode.removeEventListener('click', this.cleanUp);
//   //     document.removeEventListener('keydown', onEscKeyDown);
//   //     siteBodyNode.removeChild(root);
//   //     document.body.classList.remove('hide-overflow');
//   //     // this.#popupComponent.reset(this.#movie);
//   //   };
//   // }

//   // init = (movie) => {
//   //   this.#movie = movie;

//   //   this.#popupComponent = new PopupView(movie);

//   //   this.#movieComponent.setFilmClickHandler(() => {
//   //     this.#appendPopupToBody();
//   //     document.addEventListener('keydown', this.#onEscKeyDown);
//   //   });


//   //   if (prevFilmComponent === null) {
//   //     render(this.#movieComponent, this.#filmListContainer);
//   //   } else {
//   //     replace(this.#movieComponent, prevFilmComponent);
//   //     this.#popupComponent.reset(this.#movie);
//   //   }
//   // };

//   // destroy = () => {
//   //   remove(this.#movieComponent);
//   //   remove(this.#popupComponent);
//   // };

//   // resetView = () => {
//   //   this.#popupComponent.reset(this.#movie);
//   // };

//   // #onEscKeyDown = (evt) => {
//   //   if (evt.key === 'Escape' || evt.key === 'Esc') {
//   //     evt.preventDefault();
//   //     this.#popupComponent.reset(this.#movie);
//   //     siteBodyNode.removeChild(this.#popupComponent.element);
//   //     document.removeEventListener('keydown', this.#onEscKeyDown);
//   //     document.body.classList.remove('hide-overflow');
//   //   }
//   // };

//   // #addCommenttoPopup = (evt) => {
//   //   if (evt.ctrlKey && evt.keyCode === 13) {
//   //     if(evt.target.value !== '') {
//   //       this.#movie.comments = [...this.#movie.comments,
//   //         {
//   //           id: nanoid(),
//   //           commenter: 'Ilya OReilly',
//   //           comment: evt.target.value,
//   //           dateComment: humanizeFilmDueDate(dateComment),
//   //           emotion: evt.target.value
//   //         }];
//   //       this.#changeData(this.#movie);
//   //     }
//   //   }
//   // };

//   // #appendPopupToBody = () => {
//   //   render(this.#popupComponent, siteBodyNode);
//   //   document.body.classList.add('hide-overflow');

//   //   const root = this.#popupComponent.element;
//   //   const closeButtonNode = root.querySelector('.film-details__close-btn');
//   //   const closeOverlayNode = root.querySelector('.films-details__shadow');

//   //   closeButtonNode.addEventListener('click', this.cleanUp);
//   //   closeOverlayNode.addEventListener('click', this.cleanUp);
//   //   document.addEventListener('keydown', this.#addCommenttoPopup);

//   //   this.#changeMode();

//   // };
// }
