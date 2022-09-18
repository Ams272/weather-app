// variable declarations
const voice = document.querySelectorAll('.voice');
const searchInput = document.querySelectorAll('.main-input');
const searchButton = document.querySelectorAll('main-btn');
const suggestions = document.querySelectorAll('.suggestions');
//const suggestionList = suggestions.forEach(suggestion => suggestion.querySelectorAll('suggestions li'));
const form = document.querySelectorAll('.form');
let cities = [];
//const apikey = "o9I8UmxOErWHZmnRw2WQi755tEID5ZZD";

// get cities
const getCity = async () => {
    let base = 'http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=o9I8UmxOErWHZmnRw2WQi755tEID5ZZD';
    const response = await fetch(base);
    const data = await response.json();
    return data;
}

getCity()
    .then(data => data.map(cityName => {
        cities.push(
          {
            name: cityName.LocalizedName,
            key: cityName.Key
          }
          );
    }))
    .catch(err => console.log(err));

//console.log(cities);
  
  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      // here we need to figure out if the city matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex);
    });
  }

  function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    let html = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
      return `<li>${cityName}</li>`;
    }).join('');
    suggestions.forEach(suggestion => suggestion.innerHTML = html);

    suggestions.forEach(suggestion => suggestion.addEventListener('click', (e) => {
      //console.log(e.target.textContent);
      searchInput.forEach(input => input.value = e.target.textContent);

      // clear the lists
      suggestion.innerHTML = '';
    }))
    
  }

  searchInput.forEach(searchInput => searchInput.addEventListener('change', displayMatches));
  searchInput.forEach(searchInput => searchInput.addEventListener('keyup', displayMatches));
  searchInput.forEach(searchInput => searchInput.addEventListener('input', displayMatches));

// carry out search action

searchButton.forEach( searchButton => searchButton.addEventListener('click', () => {
  console.log('good');
  const searchValue = searchInput.value;
  console.log(searchValue);
})
)

// suggestionList.forEach(list => list.addEventListener('click', () =>{
//   console.log(this.textContent);
//   searchInput.value = list.textContent;
// }))


// voice recognition

voice.forEach(voice => voice.addEventListener('mousedown', e =>{
    e.preventDefault;

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';


  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript.split(','))
      .join('');

     

    searchInput.forEach(searchInput => {
      form.forEach(form => form.addEventListener('click', ()=>{
        searchInput.value = transcript;
    }))

  });

  })
  //recognition.addEventListener('end', recognition.start);

  recognition.start();
})
)

//voice.addEventListener('click', recognition.start);


