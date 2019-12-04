export const renderModal = (modal, tag) => {
  const { title, description } = modal;
  const titleTag = tag.querySelector('.modal-title');
  titleTag.textContent = title;
  const bodyTag = tag.querySelector('.modal-body');
  bodyTag.textContent = description;
};

export const renderRssFeed = (feedData, articles) => {
  const { title, description, id } = feedData;
  // Make container for feeds
  const feed = document.createElement('div');
  feed.classList.add('feed', 'pb-3');

  const h5 = document.createElement('h5');
  h5.textContent = title;
  feed.appendChild(h5);

  const p = document.createElement('p');
  p.textContent = description;
  feed.appendChild(p);
  // Make feeds layout
  articles.filter(({ feedId }) => feedId === id).forEach((element) => {
    const { link, article, artDescription } = element;
    // Make "a" tag for feed
    const articleLink = document.createElement('a');
    articleLink.setAttribute('href', link);
    articleLink.setAttribute('target', '_blank');
    articleLink.textContent = article;
    // Make conainer for feed
    const div = document.createElement('div');
    div.classList.add('item', 'mt-1', 'mb-1');
    // Make modal button for feed
    const buttonModal = document.createElement('button');
    buttonModal.setAttribute('type', 'button');
    buttonModal.setAttribute('data-toggle', 'modal');
    buttonModal.setAttribute('data-target', '#exampleModal');
    buttonModal.setAttribute('tabindex', '0');
    buttonModal.setAttribute('data-description', artDescription);
    buttonModal.setAttribute('data-title', article);
    buttonModal.classList.add('btn', 'btn-primary', 'btnModal', 'mr-2', 'pt-2', 'pb-2');

    div.appendChild(buttonModal);
    div.appendChild(articleLink);
    feed.appendChild(div);
  });
  return feed;
};
export const renderForm = (state) => {
  const button = document.getElementById('button');
  const rssUrl = document.getElementById('rssUrl');

  if (state.formState === 'filling') {
    button.textContent = 'Submit';
    button.disabled = false;
    rssUrl.classList.remove('alert-danger');
    rssUrl.setAttribute('placeholder', 'url');
  } else if (state.formState === 'invalidLink') {
    rssUrl.classList.add('alert-danger');
    rssUrl.setAttribute('placeholder', 'Invalid Link');
  } else if (state.formState === 'sending') {
    button.disabled = true;
    button.textContent = 'Cheking RSS Feed';
  }
  rssUrl.value = '';
};

export const renderError = (error, output) => {
  const { status, statusText, url } = error;
  const alert = document.createElement('div');
  output.before(alert);
  alert.innerHTML = `
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <p><strong>${status} ${statusText}</strong><p>
    Can't get RSS Feed at link: <a href=${url} target = _blank>${url}</a>.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
};
