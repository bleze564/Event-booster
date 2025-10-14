const formApi = document.querySelector('form');
const divApi = document.querySelector('.api-main');

formApi.addEventListener('submit', () => {
  // 1.отримати значення інпуту
  // 2.викликати функцію searcharticlesbyname як аргумент значення інпуту
  
});

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
