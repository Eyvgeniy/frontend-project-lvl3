import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import validator from 'validator';
import { watch } from 'melanke-watchjs';

const state = {
  urlValid: false,
};

const rssUrl = document.getElementById('rssUrl');
rssUrl.addEventListener('keyup', () => {
  const url = rssUrl.value;
  state.urlValid = validator.isURL(url);
});

watch(state, 'urlValid', () => {
  const button = document.getElementById('button');
  if (state.urlValid === true) {
    button.removeAttribute('disabled');
    button.classList.remove('btn-danger');
    button.classList.add('btn-primary');
    console.log('Good');
  } else {
    button.setAttribute('disabled', 'disabled');
    button.classList.remove('btn-primary');
    button.classList.add('btn-danger');
    console.log('Bad');
  }
});
