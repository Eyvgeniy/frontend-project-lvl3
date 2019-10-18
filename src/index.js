import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import validator from 'validator';
import { watch } from 'melanke-watchjs';
import axios from 'axios';
import buildFeed from './buildFeed';

const state = {
  urlValid: false
};

const rssUrl = document.getElementById('rssUrl');
const button = document.getElementById('button');

rssUrl.addEventListener('keyup', () => {
  const url = rssUrl.value;
  state.urlValid = validator.isURL(url);
});

button.addEventListener('click', e => {
  e.preventDefault();
  const promise = axios
    .get(new URL('/http://lorem-rss.herokuapp.com/feed', 'https://cors-anywhere.herokuapp.com/'))
    .then(response => {
      const parser = new DOMParser();
      const rssData = parser.parseFromString(response.data, 'text/xml');
      const feed = buildFeed(rssData);
      const output = document.querySelector('.output');
      output.appendChild(feed);
    })
    .catch(err => console.log(err));
});

// watch(state, 'urlValid', () => {
//   if (state.urlValid === true) {
//     button.removeAttribute('disabled');
//     button.classList.remove('btn-danger');
//     button.classList.add('btn-primary');
//     console.log('Good');
//   } else {
//     button.setAttribute('disabled', 'disabled');
//     button.classList.remove('btn-primary');
//     button.classList.add('btn-danger');
//     console.log('Bad');
//   }
// });
