import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import validator from 'validator';
import { watch } from 'melanke-watchjs';
import axios from 'axios';
import buildFeed from './buildFeed';
import getData from './getData';
import isUrlDouble from './utils';
import renderModal from './renderModal';

const state = {
  urlValid: '',
  feeds: [],
};

const rssUrl = document.getElementById('rssUrl');
const button = document.getElementById('button');
const output = document.querySelector('.output');
const modal = document.querySelector('#exampleModal');
const isUrlIsState = (url) => state.feeds.find((item) => item.url === url);

button.addEventListener('click', (e) => {
  e.preventDefault();
  const url = rssUrl.value;
  state.urlValid = validator.isURL(url) && !isUrlDouble(state, url);
  if (state.urlValid) {
    axios
      .get(new URL(`/${url}`, 'https://cors-anywhere.herokuapp.com'))
      .then((response) => {
        const parser = new DOMParser();
        const rssData = parser.parseFromString(response.data, 'text/xml');
        const feedData = getData(rssData);
        const newFeed = { url, ...feedData };
        state.feeds.push(newFeed);
        rssUrl.value = '';
      })
      .catch((err) => console.log(err));
  }
});


output.addEventListener('click', (e) => {
  renderModal(e.target, modal);

})

watch(state, 'urlValid', () => {
  if (state.urlValid === true) {
    rssUrl.classList.remove('alert-danger');
    rssUrl.setAttribute('placeholder', 'url')
  } else {
    rssUrl.classList.add('alert-danger');
    rssUrl.value = '';
    rssUrl.setAttribute('placeholder', 'Invalid Link')
  }
});

watch(state, 'feeds', () => {
  if (state.feeds.length === 0) {
    return;
  }
  const { feeds } = state;

  output.innerHTML = '';

  feeds.forEach((feed) => {
    const feedLayout = buildFeed(feed);
    output.appendChild(feedLayout);
  });
});
