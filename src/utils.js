export default (state, url) => state.feeds.find(feed => feed.url === url);