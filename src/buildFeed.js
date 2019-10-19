export default (data) => {
  const { title, description, articles } = data;

  const feed = document.createElement('div');
  feed.classList.add('feed', 'pb-3');
  const h5 = document.createElement('h5');
  h5.textContent = title;
  const p = document.createElement('p');
  p.textContent = description;
  feed.appendChild(h5);
  feed.appendChild(p);
  articles.forEach((element) => {
    const { link, article } = element;
    const articleLink = document.createElement('a');
    articleLink.setAttribute('href', link);
    articleLink.setAttribute('target', '_blank');
    articleLink.textContent = article;
    const div = document.createElement('div');
    div.classList.add('item', 'mt-1', 'mb-1');
    div.appendChild(articleLink);
    feed.appendChild(div);
  });
  return feed;
};
