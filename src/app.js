/* eslint no-return-assign: 0 */

import { watch } from 'melanke-watchjs';
import { validateUrl } from './utils';
import {
  renderModal, renderRssFeed, renderForm, renderError,
} from './renders';
import handlingRSS from './handler';

const state = {
  formState: '',
  feeds: [],
  articles: [],
  error: '',
  modal: '',
};

export default () => {
  const output = document.querySelector('.output');
  const modal = document.querySelector('#exampleModal');

  // Listen for form submit
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    if (validateUrl(state.feeds, url)) {
      state.formState = 'sending';
      handlingRSS(url, state);
    } else {
      state.formState = 'invalidLink';
      setTimeout(() => state.formState = 'filling', 2000);
    }
  });

  // Open modal window
  output.addEventListener('click', (e) => {
    e.preventDefault();
    const { title, description } = e.target.dataset;
    state.modal = { title, description };
  });

  // Watch valid of url
  watch(state, 'formState', () => {
    renderForm(state);
  });

  // Watch of changing feeds state
  watch(state, 'articles', () => {
    const { feeds, articles } = state;
    output.innerHTML = '';
    feeds.forEach((feed) => {
      const feedLayout = renderRssFeed(feed, articles);
      output.appendChild(feedLayout);
    });
  });
  // Watch of changing modal window state
  watch(state, 'modal', () => {
    renderModal(state.modal, modal);
  });

  // Watch of changing error window state
  watch(state, 'error', () => {
    renderError(state.error, output);
  });
};
