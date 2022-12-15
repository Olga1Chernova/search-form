const URL = 'https://hn.algolia.com/api/v1/search';

const getItemTemplate = ({title, url, objectID}) =>
    `<li class="news-item" data-id=${objectID}>
        <a href=${url} target ="_blank">${title}</a>
      </li>`;
const refs = {
    form: document.querySelector('.news-form'),
    list: document.querySelector('.news-list'),
    submitButton: document.querySelector('button[type ="submit"]'),
    loader: document.querySelector('.news-loading'),
};

let isLoading = false;

let newsItems = [];
const render = () => {
    const newsList = newsItems.map(getItemTemplate);
    refs.list.innerHTML = '';
    refs.list.insertAdjacentHTML('beforeend', newsList.join(''));
};

const showLoader = () => {
    refs.loader.classList.add('show');
};

const hideLoader = () => {
    refs.loader.classList.remove('show');
};

const onFormSubmit = (e) => {
    const {value} = e.target.elements.query;
    e.preventDefault();
    showLoader();
    fetch(`${URL}?query=${value}`)
        .then(response => response.json())
        .then(({ hits }) => {
            newsItems = hits;
            render();
        })
        .finally(hideLoader());
};

refs.form.addEventListener('submit', onFormSubmit);