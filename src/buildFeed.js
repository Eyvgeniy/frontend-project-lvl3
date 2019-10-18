export default data => {
  const items = data.querySelectorAll('item');
  console.log(items);

  const title = data.querySelector('title').textContent;
  const description = data.querySelector('description').textContent;
  const feed = document.createElement('div');
  const h5 = document.createElement('h5');
  h5.textContent = title;
  const p = document.createElement('p');
  p.textContent = description;
  feed.appendChild(h5);
  feed.appendChild(p);
  items.forEach(item => {
    const link = item.querySelector('link').textContent;
    const title = item.querySelector('title').textContent;
    // const children = link.children();
    const itemLink = document.createElement('a');
    itemLink.setAttribute('href', link);
    itemLink.setAttribute('target', '_blank');
    itemLink.textContent = title;
    const div = document.createElement('div');
    div.classList.add('item', 'mt-1', 'mb-1');
    div.appendChild(itemLink);
    feed.appendChild(div);
  });
  return feed;
};
