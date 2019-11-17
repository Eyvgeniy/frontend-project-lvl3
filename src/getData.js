export default (data) => {
  const items = data.querySelectorAll('item');
  const title = data.querySelector('title').textContent;
  const description = data.querySelector('description').textContent;
  const articles = [];
  let id = 0;
  items.forEach((item) => {
    const link = item.querySelector('link').textContent;
    const article = item.querySelector('title').textContent;
    const artDescription = item.querySelector('description').textContent;
    articles.push({ link, article, artDescription, id });
    ++id;
  });

  return { title, description, articles };
};
