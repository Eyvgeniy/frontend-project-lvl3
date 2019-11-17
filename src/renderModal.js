export default (data, doc) => {
  const { title } = data.dataset;
  const { description } = data.dataset;
  const titleTag = doc.querySelector('.modal-title');
  titleTag.textContent = title;
  const bodyTag = doc.querySelector('.modal-body');
  bodyTag.textContent = description;
};
