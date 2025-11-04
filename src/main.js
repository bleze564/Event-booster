import Pagination from 'tui-pagination';

let page = 0;

fetchEvents().then(result => {
  page += 1;
  let markup = result._embedded.events.map(createEventMarkup);
  divApi.insertAdjacentHTML('beforeend', markup);
});
const formApi = document.querySelector('form');
const divApi = document.querySelector('.api-main');
const paginationContainer = document.getElementById('pagination');
formApi.addEventListener('submit', ev => {
  ev.preventDefault();
  const searchValue = ev.target.elements.query.value;
  searchEventsByName(searchValue).then(result => {
    let markup = result._embedded.events.map(createEventMarkup);
    divApi.innerHTML = markup;
  });
});
function fetchEvents(page = '0') {
  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=eXb8ULUoq4HjIKYn2xDLaMMehZFueL04?page=${page}`
  ).then(result => result.json());
}

function searchEventsByName(queryFound) {
  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=eXb8ULUoq4HjIKYn2xDLaMMehZFueL04&keyword=${queryFound}`
  ).then(result => result.json());
}

function createEventMarkup(event) {
  return `
       <article class='event-card'>
        <div class='img-wrap'>
        <img class='event-img' src="${event.images[6].url}" alt="event image">
        </div>
        <h2 class='event-name' >${event.name}</h2>
        <p class='event-dates' >${event.dates.start.localDate}</p>
        <p class='event-place' >${event.locale}</p>
     </article>
`;
}

// пагінація

const pagination = new Pagination(paginationContainer, {
  totalItems: 20,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}p</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}p</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
});
pagination.on('afterMove', function (eventData) {
  fetchEvents(page).then(result => {
    page += 1;
    let markup = result._embedded.events.map(createEventMarkup);
    divApi.insertAdjacentHTML('beforeend', markup);
  });
  alert('The current page is ' + eventData.page);
});
