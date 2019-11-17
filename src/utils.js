import { uniqueId } from 'lodash';
export const isUrlDouble = (state, url) => state.feeds.find((feed) => feed.url === url);


const addId = (data, id) => {
  return { id, ...data };
}
const addIdArray = (array, id) => {
  return array.map(el => ({ ...el, feedId: id }))
}
export const addIdFeed = (feed, articles, id) => {
  const newId = id();
  const feedWithId = addId(feed, newId);
  const articlesWithId = addIdArray(articles, newId);
  return { 'feed': feedWithId, 'articles': articlesWithId }
}