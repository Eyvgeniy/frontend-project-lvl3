import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import validator from 'validator';
import { watch } from 'melanke-watchjs';
import axios from 'axios';
import buildFeed from './buildFeed';
import getData from './getData';
import { isUrlDouble, addIdFeed } from './utils';
import renderModal from './renderModal';
import { union, uniqueId } from 'lodash';

const state = {
  urlValid: '',
  feeds: [],
  articles: [],
};

const rssUrl = document.getElementById('rssUrl');
const output = document.querySelector('.output');
const modal = document.querySelector('#exampleModal');
const isUrlIsState = (url) => state.feeds.find((item) => item.url === url);


const fetchData = (url) => {
  return axios
    .get(new URL(`/${url}`, 'https://cors-anywhere.herokuapp.com'))
    .then((response) => {
      const parser = new DOMParser();
      const rssData = parser.parseFromString(response.data, 'text/xml');
      const feedData = getData(rssData);
      const { title, description, articles } = feedData;
      const feed = { url, title, description };
      return addIdFeed(feed, articles, uniqueId);
    })
    .catch((err) => console.log(err));
}

// Listen for form submit
document.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const url = formData.get('url');
  state.urlValid = validator.isURL(url) && !isUrlDouble(state, url);
  if (state.urlValid) {
    // axios
    //   .get(new URL(`/${url}`, 'https://cors-anywhere.herokuapp.com'))
    //   .then((response) => {
    //     const parser = new DOMParser();
    //     const rssData = parser.parseFromString(response.data, 'text/xml');
    //     const feedData = getData(rssData);
    //     const newFeed = { url, ...feedData };
    //     state.feeds.push(newFeed);
    //     rssUrl.value = '';
    //   })
    //   .catch((err) => console.log(err));
    const feed = fetchData(url);
    feed.then(({ feed, articles }) => {
      state.feeds = [...state.feeds, feed];
      state.articles = [...state.articles, ...articles];
      rssUrl.value = '';
    });
  }
});

// Checking update of feeds
// const setDelay = (func, delay, arg) => {
//   setTimeout(func, delay, arg);
//   return setTimeout(setDelay, delay, func, delay, arg)
// }
// const updateFeeds = (feeds) => {

//   if (feeds.length === 0) {
//     return
//   }
//   const promises = feeds.map((feed) => {
//     fetchData(feed.url).then((data) => {
//       const { url, title, description } = data;
//       const newArticles = data.articles;
//       const updateArticles = union(newArticles, feed.articles);
//       console.log(updateArticles);
//       return { url, title, description, updateArticles };
//     })
//   })
//   const promise = Promise.all(promises);
//   // promise.then(contents => state.feeds = contents)
// }
// setDelay(updateFeeds, 5000, state.feeds)



// Open madal window
output.addEventListener('click', (e) => {
  renderModal(e.target, modal);
});

// Watch valid of url
watch(state, 'urlValid', () => {
  if (state.urlValid === true) {
    rssUrl.classList.remove('alert-danger');
    rssUrl.setAttribute('placeholder', 'url');
  } else {
    rssUrl.classList.add('alert-danger');
    rssUrl.value = '';
    rssUrl.setAttribute('placeholder', 'Invalid Link');
  }
});

// Watch of changing feeds state
watch(state, 'feeds', () => {
  if (state.feeds.length === 0) {
    return;
  }
  const { feeds, articles } = state;
  output.innerHTML = '';
  feeds.forEach((feed) => {
    const feedLayout = buildFeed(feed, articles);
    output.appendChild(feedLayout);
  });
});
