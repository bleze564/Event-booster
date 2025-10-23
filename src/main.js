fetchEvents().then(result => {
    let markup = result._embedded.events.map(createEventMarkup);
    divApi.insertAdjacentHTML("beforeend", markup)
  })
const formApi = document.querySelector('form');
const divApi = document.querySelector('.api-main');

formApi.addEventListener('submit', ev => {
  ev.preventDefault();
  const searchValue = ev.target.elements.query.value;
  searchEventsByName(searchValue).then(result => {
    let markup = result._embedded.events.map(createEventMarkup);
    divApi.insertAdjacentHTML("beforeend", markup)
  });
});
function fetchEvents(){
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
       <article>
        <img src="${event.images}" alt="">
        <h2>${event.name}</h2>
        <p>${event.dates}</p>
        <p>${event.place}</p>
     </article>
`;
}
