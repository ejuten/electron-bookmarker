const parser = new DOMParser();
const linksSection = document.querySelector('.links');
const errorMessage = document.querySelector('.error-message');
const newLinkForm = document.querySelector('.new-link-form');
const newLinkUrl = document.querySelector('.new-link-url');
const newLinkSubmit = document.querySelector('.new-link-submit');
const clearStorageButton = document.querySelector('.clear-storage');
const clearForm = () => {
  newLinkUrl.value = null;
};
const parseResponse = (text) => {
  return parser.parseFromString(text, 'text/html');
};
const findTitle = (nodes) => {
  return nodes.querySelector('title').innerText;
};
const storeLink = (title, url) => {
  localStorage.setItem(url, JSON.stringify({ title: title, url: url }));
};
const getLinks = () => {
  return Object.keys(localStorage)
               .map(key => JSON.parse(localStorage.getItem(key)));
};
const convertToElement = (link) => {
  return `
  <div class="link">
    <h3>${link.title}</h3>
    <p>
      <a href="${link.url}">${link.url}></a>
    </p>
  </div>
  `;
};
const renderLinks = () => {
  const linkElements = getLink().map(convertToElement).join('');
  linksSection.innerHTML = linkElements;
};

clearStorageButton.addEventListener('click', () => {
  localStorage.clear();
  linksSection.innerHTML = '';
});

newLinkUrl.addEventListener('keyup', () => {
  newLinkSubmit.disabled = !newLinkUrl.validity.valid;
});

newLinkForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const url = newLinkUrl.value;
  fetch(url)
    .then(response => response.text())
    .then(parseResponse)
    .then(findTitle)
    .then(title => storeLink(title, url))
    .then(clearForm)
    .then(renderLinks);
});

renderLinks();