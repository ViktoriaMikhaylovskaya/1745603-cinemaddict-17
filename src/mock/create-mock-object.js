import {title, alternativeTitle, director, writers, actors, releaseCountry, genre, description, poster} from './data.js';
import {getRandomItem, getRandomNumber, getRandomValue} from '../util.js';


// Создание объекта с информацией о фильме

export const createMockObject = () => ({
  filmInfo: {
    title: getRandomItem(title),
    alternativeTitle: getRandomItem(alternativeTitle),
    totalRating: getRandomValue(0.1, 10, 1),
    poster: `images/posters/${getRandomItem(poster)}`,
    ageRating: getRandomNumber(1888, 2022),
    director: getRandomItem(director),
    writers: getRandomItem(writers),
    actors: getRandomItem(actors),

    release: {
      // date: '2019-05-11T00:00:00.000Z',
      releaseCountry: getRandomItem(releaseCountry)
    },
    runtime: 77,
    genre: getRandomItem(genre),
    description: getRandomItem(description)
  },
  // userDetails: {
  //   watchlist: false,
  //   alreadyWatched: true,
  //   watchingDate: '2019-04-12T16:12:32.554Z',
  //   favorite: false
  // }
});


// Создание массива с нужным количеством объектов

export function createMockArray(amount) {
  const array = [];

  for (let i = 1; i <= amount; i++) {
    array.push(createMockObject(i));
  }

  return array;
}
// console.log(createMockArray(10));
