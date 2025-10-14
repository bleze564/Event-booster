

const baseUrl =''
function searchArticlesByName() { 
  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=eXb8ULUoq4HjIKYn2xDLaMMehZFueL04`
  ).then((result) => result.json());
}
// function createArticleMarkup (article) {
//   return `
//        <article>
//         <img src="${article.images}" alt="">
//         <h2>${article.name}</h2>
//         <p>${article.dates}</p>
//         <p>${article.description}</p>
//      </article>
// `;
// }
searchArticlesByName()