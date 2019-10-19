import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import validator from 'validator';
import { watch } from 'melanke-watchjs';
import axios from 'axios';
import buildFeed from './buildFeed';
import getData from './getData';

const state = {
  urlValid: false,
  feeds: [],
};

const rssUrl = document.getElementById('rssUrl');
const button = document.getElementById('button');
const isUrlIsState = (url) => state.feeds.find((item) => item.url === url);

// rssUrl.addEventListener('keyup', () => {
//   const url = rssUrl.value;
//   state.urlValid = validator.isURL(url);
//   console.log(isUrlIsState(url));
// });

button.addEventListener('click', (e) => {
  e.preventDefault();
  const url = rssUrl.value;
  state.urlValid = validator.isURL(url);

  const promise = axios
    .get(new URL('/http://lorem-rss.herokuapp.com/feed', 'https://cors-anywhere.herokuapp.com/'))
    .then((response) => {
      const parser = new DOMParser();
      const rssData = parser.parseFromString(response.data, 'text/xml');
      const feedData = getData(rssData);
      const newFeed = { url, ...feedData };
      state.feeds.push(newFeed);
      rssUrl.value = '';
    })
    .catch((err) => console.log(err));
});

watch(state, 'urlValid', () => {
  console.log(state.urlValid);
  if (state.urlValid === true) {
    rssUrl.classList.remove('border-danger');
    button.classList.remove('btn-danger');
    button.classList.add('btn-primary');
  } else {
    rssUrl.classList.add('border-danger');

    button.classList.remove('btn-primary');
    button.classList.add('btn-danger');
  }
});

watch(state, 'feeds', () => {
  if (state.feeds.length === 0) {
    return;
  }
  const { feeds } = state;

  feeds.forEach((feed) => {
    const feedLayout = buildFeed(feed);
    const output = document.querySelector('.output');
    output.appendChild(feedLayout);
  });
});
