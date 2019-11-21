import axios from 'axios';
import { uniqueId } from 'lodash';
import {
  addIdFeed, addIdArray, filterUniq, isUrlDouble,
} from './utils';

const cors = 'https://cors-anywhere.herokuapp.com';
const timeout = 5000;

const getRssData = (data) => {
  const parser = new DOMParser();
  const rssData = parser.parseFromString(data, 'text/xml');
  const items = rssData.querySelectorAll('item');
  const title = rssData.querySelector('title').textContent;
  const description = rssData.querySelector('description').textContent;
  const articles = [];
  items.forEach((item) => {
    const link = item.querySelector('link').textContent;
    const article = item.querySelector('title').textContent;
    const artDescription = item.querySelector('description').textContent;
    articles.push({ link, article, artDescription });
  });
  return { title, description, articles };
};

const addNewArticles = (articles, url, state) => {
  const { id } = state.feeds.find((feed) => feed.url === url);
  const existArticles = state.articles.filter((article) => article.feedId === id);
  const newArticles = filterUniq(existArticles, articles);
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
const fetchRss = (url, state) => {
  axios
    .get(new URL(`/${url}`, cors))
    .then((response) => {
      addFeed(response.data, url, state);
      state.formState = 'filling';
      setTimeout(() => fetchRss(url, state), timeout);
    })
    .catch((err) => {
      const { status, statusText } = err.response;
      state.error = { status, statusText, url };
      state.formState = 'filling';
      throw err;
    });
};

export default fetchRss;
