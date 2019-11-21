export const isUrlDouble = (feeds, url) => {
  if (feeds.length === 0) {
    return false;
  }
  return !!feeds.find((feed) => feed.url === url);
};

const addId = (data, id) => ({ id, ...data });
export const addIdArray = (array, id) => array.map((el) => ({ ...el, feedId: id }));
export const addIdFeed = (feed, articles, id) => {
  const newId = id();
  const feedWithId = addId(feed, newId);
  const articlesWithId = addIdArray(articles, newId);
  return { feed: feedWithId, articles: articlesWithId };
};

export const filterUniq = (firstArray, secondArray) => {
  secondArray.filter((el) => !firstArray.find((art) => art.article === el.article));
};
