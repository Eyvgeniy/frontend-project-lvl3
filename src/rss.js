export default (data) => {
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
