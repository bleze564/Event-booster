fetchEvents().then(result => {
  let markup = result._embedded.events.map(createEventMarkup);
  divApi.insertAdjacentHTML('beforeend', markup);
});
const formApi = document.querySelector('form');
const divApi = document.querySelector('.api-main');

formApi.addEventListener('submit', ev => {
  ev.preventDefault();
  const searchValue = ev.target.elements.query.value;
  searchEventsByName(searchValue).then(result => {
    let markup = result._embedded.events.map(createEventMarkup);
    divApi.innerHTML = markup;
  });
});
function fetchEvents() {
  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=eXb8ULUoq4HjIKYn2xDLaMMehZFueL04`
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
