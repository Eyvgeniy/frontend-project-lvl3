export default (data) => {
  const { title, description, articles } = data;
  // Make container for feeds
  const feed = document.createElement('div');
  feed.classList.add('feed', 'pb-3');
  const h5 = document.createElement('h5');
  h5.textContent = title;
  const p = document.createElement('p');
  p.textContent = description;
  feed.appendChild(h5);
  feed.appendChild(p);
  // Make feeds layout
  articles.forEach((element) => {
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
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    button.setAttribute('tabindex', '0');
    button.setAttribute('data-description', artDescription);
    button.setAttribute('data-title', article);
    button.classList.add('btn', 'btn-primary', 'btnModal', 'mr-2', 'pt-2', 'pb-2');

    div.appendChild(button);
    div.appendChild(articleLink);
    feed.appendChild(div);
  });
  return feed;
};
