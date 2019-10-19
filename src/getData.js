export default (data) => {
  const items = data.querySelectorAll('item');
  const title = data.querySelector('title').textContent;
  const description = data.querySelector('description').textContent;
  const articles = [];
  items.forEach((item) => {
    const link = item.querySelector('link').textContent;
    const article = item.querySelector('title').textContent;
    articles.push({ link, article });
  });

  return { title, description, articles };
};
