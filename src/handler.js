/* eslint no-param-reassign: 0 */

import axios from 'axios';
import { uniqueId, differenceBy } from 'lodash';
import getRssData from './rss';
import {
  addIdFeed, addIdArray, isUrlDouble,
} from './utils';

const cors = 'https://cors-anywhere.herokuapp.com';
const timeout = 5000;

const addNewArticles = (articles, url, state) => {
  const { id } = state.feeds.find((feed) => feed.url === url);
  const existArticles = state.articles.filter((article) => article.feedId === id);
  const newArticles = differenceBy(articles, existArticles, 'link');
  const newArticlesWithId = addIdArray(newArticles, id);
  state.articles = [...state.articles, ...newArticlesWithId];
};

const addFeed = (data, url, state) => {
  const { title, description, articles } = getRssData(data);
  const isFeedAdded = isUrlDouble(state.feeds, url);
  if (isFeedAdded) {
    addNewArticles(articles, url, state);
  } else {
    const feed = { url, title, description };
    const feedData = addIdFeed(feed, articles, uniqueId);
    state.feeds = [...state.feeds, feedData.feed];
    state.articles = [...state.articles, ...feedData.articles];
  }
};
const handlingRSS = (url, state) => {
  axios
    .get(new URL(`/${url}`, cors))
    .then((response) => {
      addFeed(response.data, url, state);
      state.formState = 'filling';
      setTimeout(() => handlingRSS(url, state), timeout);
    })
    .catch((err) => {
      const { status, statusText } = err.response;
      state.error = { status, statusText, url };
      state.formState = 'filling';
      throw err;
    });
};

export default handlingRSS;
