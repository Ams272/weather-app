// variable declarations
const voice = document.querySelector('.voice');
const searchInput = document.querySelector('.search');
const searchButton = document.querySelector('.searchButton');
const searchValue = searchInput.value;
const suggestions = document.querySelector('.suggestions');
let cities = [];

// get cities
const getCity = async () => {
    let base = 'http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=o9I8UmxOErWHZmnRw2WQi755tEID5ZZD';
    const response = await fetch(base);
    const data = await response.json();
    return data;
}

getCity()
    .then(data => data.map(cityName => {
        cities.push(cityName.LocalizedName);
    }))
    .catch(err => console.log(err));

//console.log(cities);
  
  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      // here we need to figure out if the city matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return place.match(regex);
    });
  }

  function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.replace(regex, `<span class="hl">${this.value}</span>`);
      return `<li>${cityName}</li>`;
    }).join('');
    suggestions.innerHTML = html;
  }

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);
  searchInput.addEventListener('input', displayMatches);

// 

searchButton.addEventListener('click' ()=>{
  console.log('good');
})


// voice recognition
voice.addEventListener('mouseup', e =>{
    e.preventDefault;

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';


  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    searchInput.value = transcript; 

  });

  //recognition.addEventListener('end', recognition.start);

  recognition.start();
});

//voice.addEventListener('click', recognition.start);


