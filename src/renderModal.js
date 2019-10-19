export default (data, doc) => {
  const title = data.dataset.title;
  const description = data.dataset.description;
  const titleTag = doc.querySelector('.modal-title');
  titleTag.textContent = title;
  const bodyTag = doc.querySelector('.modal-body');
  bodyTag.textContent = description;
}